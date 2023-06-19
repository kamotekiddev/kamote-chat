"use client";

import useRoutes from "@/hooks/useRoutes";
import SidebarItem from "./SidebarItem";

const SidebarList = () => {
  const routes = useRoutes();

  return (
    <div className="space-y-2">
      {routes.map((route, i) => (
        <SidebarItem
          key={i}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={route?.isActive}
          onClick={route?.onClick}
        />
      ))}
    </div>
  );
};

export default SidebarList;
