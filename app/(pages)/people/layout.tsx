import getUsers from "@/libs/getUsers";
import Sidebar from "@/components/Sidebar";
import UserList from "./UserList";

interface Props {
  children: React.ReactNode;
}
const ChatLayout = async ({ children }: Props) => {
  const users = await getUsers();

  return (
    <div className="h-screen">
      {/* @ts-expect-error Server Component */}
      <Sidebar>
        <UserList users={users} />
        {children}
      </Sidebar>
    </div>
  );
};

export default ChatLayout;
