import getConversationById from "@/libs/getConversationById";
import ChatHeader from "./ChatHeader";
import EmptyState from "@/components/EmptyState";
import getMessages from "@/libs/getMessages";
import Messages from "./Messages";
import TypingBox from "./TypingBox";

interface Props {
   params: {
      chatId: string;
   };
}

const Chat = async ({ params: { chatId } }: Props) => {
   const conversation = await getConversationById(chatId);
   const messages = await getMessages(chatId);

   if (!conversation) return <EmptyState />;

   return (
      <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden">
         <ChatHeader conversation={conversation} />
         <Messages initialMessages={messages} conversationId={chatId} />
         <TypingBox key={chatId} conversationId={chatId} />
      </div>
   );
};

export default Chat;
