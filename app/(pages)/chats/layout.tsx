import getConversations from "@/libs/getConversations";
import getUsers from "@/libs/getUsers";

import Sidebar from "@/components/Sidebar";
import ConversationList from "./ConversationList";

interface Props {
  children: React.ReactNode;
}
const ChatLayout = async ({ children }: Props) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <main className="grid h-screen grid-cols-[200px_300px_auto]">
      <Sidebar />
      <ConversationList initialConversations={conversations} users={users} />
      {children}
    </main>
  );
};

export default ChatLayout;
