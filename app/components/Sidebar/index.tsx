import getCurrentUser from "@/libs/getCurrentUser";
import SidebarList from "./SidebarList";
import UserButton from "../UserButton";

const Sidebar = async () => {
  const user = await getCurrentUser();
  return (
    <nav className="grid w-full grid-rows-[1fr_auto] content-start gap-4 bg-indigo-50/40 p-4">
      <SidebarList />
      <UserButton user={user} />
    </nav>
  );
};

export default Sidebar;
