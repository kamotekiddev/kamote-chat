import Avatar from "@/components/Avatar";
import { User } from "@prisma/client";
import { ComponentProps } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  user: User;
  variant: "add" | "remove";
  isActive?: boolean;
}

const SelectionItem = ({ user, variant, isActive, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        "w-full rounded-lg bg-neutral-100 p-2 px-4 transition-colors duration-200 ease-linear hover:bg-neutral-200",
        isActive && "bg-indigo-600 text-white hover:bg-indigo-700"
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar user={user} />
        <div className="flex-1">{user.name}</div>
        <button {...props} type="button">
          {variant === "add" ? <FiPlus /> : <FiX />}
        </button>
      </div>
    </div>
  );
};

export default SelectionItem;
