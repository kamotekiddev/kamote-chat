import { User } from "@prisma/client";
import SidebarList from "./SidebarList";
import UserButton from "../UserButton";

interface Props {
  user: User | null;
}

const DesktopSidebar = ({ user }: Props) => {
  return (
    <nav className="hidden w-full grid-rows-[1fr_auto] content-start gap-4 bg-indigo-50/40 p-4 md:grid">
      <SidebarList />
      <UserButton user={user} />
    </nav>
  );
};

export default DesktopSidebar;
