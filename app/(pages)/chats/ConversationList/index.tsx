"use client";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

import { pusherClient } from "@/libs/pusher";
import { Conversation, User, Message } from "@prisma/client";
import ConversationListItem from "./ConversationListItem";
import CreateGroupChatModal from "./CreateGroupChatModal";
import Loading from "../loading";
import useConversation from "@/hooks/useConversation";

interface FullMessageType extends Message {
  sender: User;
  seenByUsers: User[];
}

export interface FullConversation extends Conversation {
  users: User[];
  messages: FullMessageType[];
}
interface Props {
  initialConversations?: FullConversation[];
  users: User[];
}
const ConversationList = ({ initialConversations, users }: Props) => {
  const router = useRouter();
  const { data } = useSession();
  const [conversations, setConversations] = useState<FullConversation[]>(
    initialConversations || []
  );
  const [isLoading, setLoading] = useState(false);
  const { chatId, isOpen } = useConversation();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (data?.user?.email) pusherClient.subscribe(data?.user?.email!);

    const newConversationHandler = (conversation: FullConversation) => {
      setConversations((current) => {
        if (_.find(current, { id: conversation.id })) return current;
        return [conversation, ...current];
      });
    };
    const updateConversationHandler = (conversation: FullConversation) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id)
            return {
              ...currentConversation,
              messages: conversation.messages,
            };

          return currentConversation;
        })
      );
    };

    const removeConversationHandler = (conversation: FullConversation) => {
      setConversations((current) =>
        current.filter((convo) => convo.id !== conversation.id)
      );
      if (chatId === conversation.id) router.replace("/chats");
    };

    pusherClient.bind("conversation:new", newConversationHandler);
    pusherClient.bind("conversation:update", updateConversationHandler);
    pusherClient.bind("conversation:remove", removeConversationHandler);

    return () => {
      pusherClient.unbind("conversation:new", newConversationHandler);
      pusherClient.unbind("conversation:update", updateConversationHandler);
      pusherClient.unbind("conversation:remove", removeConversationHandler);
    };
  }, [data?.user?.email, chatId, router]);

  const handleSelectConversation = (id: string) => {
    setLoading(true);
    router.push(`/chats/${id}`);
    setLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div
        className={twMerge(
          "grid h-full w-full grid-rows-[auto_1fr] gap-4 overflow-hidden bg-indigo-50/60 p-4 lg:grid",
          isOpen ? "hidden" : "grid"
        )}
      >
        <header className="flex justify-between gap-4 px-2">
          <h1 className="prose-lg font-bold">Messages</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-grid h-8 w-8 place-items-center rounded-lg transition-colors duration-100  ease-in hover:bg-gray-100"
          >
            <FiUserPlus />
          </button>
        </header>
        {!conversations.length && (
          <div className="px-2">No conversations yet.</div>
        )}
        <div className="h-full overflow-auto scrollbar-hide">
          {conversations?.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              isActive={chatId === conversation.id}
              onSelect={handleSelectConversation}
            />
          ))}
        </div>
      </div>
      <CreateGroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ConversationList;
