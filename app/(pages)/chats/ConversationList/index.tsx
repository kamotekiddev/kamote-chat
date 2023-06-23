"use client";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import { useSession } from "next-auth/react";

import { pusherClient } from "@/libs/pusher";
import { Conversation, User, Message } from "@prisma/client";
import ConversationListItem from "./ConversationListItem";
import CreateGroupChatModal from "./CreateGroupChatModal";

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
  const [conversations, setConversations] = useState<FullConversation[]>(
    initialConversations || []
  );
  const { chatId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const { data } = useSession();

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

      if (chatId === conversation.id) router.push("/chats");
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

  const handleSelectConversation = (id: string) => router.push(`/chats/${id}`);

  return (
    <>
      <div className="grid w-full grid-rows-[auto_1fr] gap-4 overflow-hidden bg-indigo-50/10 p-4">
        <header className="flex justify-between gap-4 px-2">
          <h1 className="prose-lg font-bold">Messages</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-grid h-8 w-8 place-items-center rounded-lg transition-colors duration-100  ease-in hover:bg-gray-100"
          >
            <FiUserPlus />
          </button>
        </header>
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
