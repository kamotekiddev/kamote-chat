"use client";

import _ from "lodash";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Message, User } from "@prisma/client";
import { pusherClient } from "@/libs/pusher";
import MessageBox from "./MessageBox";
import EmptyState from "@/components/EmptyState";
import TypingBox from "./TypingBox";

export interface FullMessage extends Message {
  sender: User;
  seenByUsers: User[];
}

interface Props {
  initialMessages: FullMessage[];
  conversationId: string;
  user: User;
}
const Messages = ({ initialMessages, conversationId, user }: Props) => {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState<FullMessage[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    const messageHandler = (incomingMessage: FullMessage) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setTimeout(() => {
        setMessages((current) => {
          if (_.find(current, { id: incomingMessage.id })) return current;
          return [...current, incomingMessage];
        });
      }, 2000);

      bottomRef.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessage) =>
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage;
          return currentMessage;
        })
      );

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId, user.id]);

  const handleSendMessage = async (text: string) => {
    const id = Date.now().toString();
    setTextMessage("");

    setMessages((current) => [
      ...current,
      {
        id,
        body: text,
        sender: user,
        senderId: user.id,
        conversationId,
      } as FullMessage,
    ]);

    bottomRef.current?.scrollIntoView();

    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ message: text, conversationId }),
    });

    const data = await response.json();

    setMessages((currentMessages) =>
      currentMessages.map((currentMessage) =>
        currentMessage.id === id ? data : currentMessage
      )
    );
  };

  return (
    <div className="grid grid-rows-[1fr_auto] overflow-hidden">
      {!messages.length && (
        <EmptyState
          title="Started a Conversation"
          message="Start typing and send a message to each other"
        />
      )}
      <div className="flex h-full flex-col gap-2 overflow-auto p-4 scrollbar-hide">
        {messages?.map((message) => (
          <MessageBox
            key={message.id}
            isLast={messages[messages.length - 1].id === message.id}
            message={message}
          />
        ))}
        <div ref={bottomRef} className="mb-10" />
      </div>
      <TypingBox
        key={conversationId}
        value={textMessage}
        onChange={setTextMessage}
        onSentMessage={handleSendMessage}
      />
    </div>
  );
};

export default Messages;
