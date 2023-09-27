"use client";

import { useSession } from "next-auth/react";
import { FullMessage } from ".";
import { twMerge } from "tailwind-merge";
import Avatar from "@/components/Avatar";
import Image from "next/image";

interface Props {
  isLast?: boolean;
  message: FullMessage;
}

const MessageBox = ({ message, isLast }: Props) => {
  const session = useSession();
  const isOwnMessage = session.data?.user?.email === message?.sender?.email;

  const seenList = (message.seenByUsers || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name?.split(" ")[0])
    .join(", ");

  return (
    <div className={twMerge("flex gap-4", isOwnMessage && "justify-end")}>
      {!isOwnMessage && <Avatar user={message.sender} />}
      {message.image ? (
        <Image
          src={message.image}
          alt="Image"
          width={288}
          height={288}
          className="rounded-lg"
        />
      ) : (
        <div className="flex flex-col items-end gap-2">
          <div
            className={twMerge(
              "w-fit max-w-md rounded-lg bg-gray-100 p-2 px-4",
              isOwnMessage && "bg-indigo-600 text-white"
            )}
          >
            {message.body}
          </div>
          <div className="max-w-[200px] overflow-hidden">
            {isLast && isOwnMessage && seenList.length > 0 && (
              <div className="truncate text-xs font-light text-gray-500">
                {`Seen by ${seenList}`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
