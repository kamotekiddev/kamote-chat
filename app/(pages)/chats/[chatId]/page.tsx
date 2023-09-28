import getConversationById from "@/libs/getConversationById";
import ChatHeader from "./ChatHeader";
import EmptyState from "@/components/EmptyState";
import getMessages from "@/libs/getMessages";
import Messages from "./Messages";
import getCurrentUser from "@/libs/getCurrentUser";

interface Props {
  params: {
    chatId: string;
  };
}

const Chat = async ({ params: { chatId } }: Props) => {
  const user = await getCurrentUser();
  const conversation = await getConversationById(chatId);
  const messages = await getMessages(chatId);

  if (!conversation || !user) return <EmptyState />;

  return (
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden">
      <ChatHeader conversation={conversation} />
      <Messages
        initialMessages={messages}
        conversationId={chatId}
        user={user}
      />
    </div>
  );
};

export default Chat;
