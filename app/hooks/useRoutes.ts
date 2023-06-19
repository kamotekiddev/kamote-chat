"use client";

import { useMemo } from "react";
import { signOut } from "next-auth/react";
import { FaComment, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();
  const params = useParams();

  return useMemo(
    () => [
      {
        label: "Messages",
        icon: FaComment,
        href: "/chats",
        isActive: pathname === "/chats" || !!params?.chatId,
      },
      {
        label: "People",
        icon: FaUsers,
        href: "/people",
        isActive: pathname === "/people",
      },
      {
        label: "Logout",
        icon: FaSignOutAlt,
        href: "#",
        onClick: () => signOut(),
      },
    ],
    [pathname, params]
  );
};

export default useRoutes;
