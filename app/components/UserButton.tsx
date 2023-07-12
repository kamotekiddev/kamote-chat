import { User } from "@prisma/client";
import Avatar from "./Avatar";

interface Props {
  user: User | null;
}

const UserButton = ({ user }: Props) => {
  if (!user) return null;

  return (
    <button className="flex w-full items-center gap-4 overflow-hidden rounded-lg p-3 transition hover:bg-neutral-100">
      <Avatar user={user} />
      <div className="flex-1 overflow-hidden text-left">
        <h1 className="prose-sm truncate font-medium">{user.name}</h1>
        <p className="truncate text-sm">{user.email}</p>
      </div>
    </button>
  );
};

export default UserButton;
