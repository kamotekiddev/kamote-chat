"use client";

import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Conversation, User } from "@prisma/client";
import LoadingModal from "@/components/LoadingModal";
import UserListItem from "./UserListItem";
import useConversation from "@/hooks/useConversation";

interface Props {
  users?: User[];
}

const UserList = ({ users }: Props) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { isOpen } = useConversation();

  const handleSelect = async (user: User) => {
    setLoading(true);
    const response = await fetch("/api/conversations", {
      method: "POST",
      body: JSON.stringify({ userId: user?.id }),
    });
    const data: Conversation = await response.json();
    setLoading(false);
    if (!data) return null;
    router.push(`/chats/${data?.id}`);
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        className={twMerge(
          "h-full w-full bg-indigo-50/60 p-4",
          isOpen ? "hidden" : "block"
        )}
      >
        <header className="px-2">
          <h1 className="prose-lg font-bold">People</h1>
        </header>
        {!users?.length && <div className="px-2">No users yet.</div>}
        <div className="mt-5 space-y-2">
          {users?.map((user) => (
            <UserListItem key={user.id} user={user} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
