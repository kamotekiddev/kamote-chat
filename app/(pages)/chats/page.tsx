"use client";

import { twMerge } from "tailwind-merge";
import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/useConversation";

const Chats = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={twMerge("h-full p-4 lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Chats;
