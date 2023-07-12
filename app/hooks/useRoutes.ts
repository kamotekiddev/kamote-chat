"use client";

import { useMemo } from "react";
import { FaComment, FaUsers } from "react-icons/fa";
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
    ],
    [pathname, params]
  );
};

export default useRoutes;
