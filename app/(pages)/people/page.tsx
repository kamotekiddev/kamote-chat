"use client";

import { twMerge } from "tailwind-merge";
import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/useConversation";

const People = () => {
  const { isOpen } = useConversation();

  return (
    <div className={twMerge("h-full lg:block", isOpen ? "block" : "hidden")}>
      <EmptyState />
    </div>
  );
};

export default People;
