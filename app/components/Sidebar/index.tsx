import { ReactNode } from "react";
import getCurrentUser from "@/libs/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

interface Props {
  children: ReactNode;
}
const Sidebar = async ({ children }: Props) => {
  const user = await getCurrentUser();

  return (
    <div className="grid h-full grid-rows-[1fr_auto] lg:grid-cols-[270px_300px_1fr] lg:grid-rows-1">
      <DesktopSidebar user={user} />
      {children}
      <MobileFooter user={user} />
    </div>
  );
};

export default Sidebar;
