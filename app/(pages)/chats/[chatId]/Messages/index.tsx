"use client";

import _ from "lodash";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Message, User } from "@prisma/client";
import { pusherClient } from "@/libs/pusher";
import MessageBox from "./MessageBox";
import EmptyState from "@/components/EmptyState";

export interface FullMessage extends Message {
  sender: User;
  seenByUsers: User[];
}

interface Props {
  initialMessages: FullMessage[];
  conversationId: string;
}
const Messages = ({ initialMessages, conversationId }: Props) => {
  const [messages, setMessages] = useState<FullMessage[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    /* 
      TODO Optimistic Update
           merge the messages and typing box
           the message from the pusher is coming from the current user do nothing and make it optimistic
        
    */

    const messageHandler = (message: FullMessage) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (_.find(current, { id: message.id })) return current;
        return [...current, message];
      });

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
  }, [conversationId]);

  if (!messages?.length)
    return (
      <EmptyState
        title="Started a Conversation"
        message="Start typing and send a message to each other"
      />
    );

  return (
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
  );
};

export default Messages;
