import { User } from "@prisma/client";
import { FaComment, FaUsers } from "react-icons/fa";
import Avatar from "../Avatar";

interface Props {
  user: User | null;
}

const MobileFooter = ({ user }: Props) => {
  return (
    <nav className="md:hidden">
      <div className="flex">
        <button className="flex flex-1 justify-center p-2 px-4 transition-colors duration-200 ease-in-out hover:bg-neutral-100">
          <FaComment className="h-10 w-10" />
        </button>
        <button className="flex flex-1 justify-center p-2 px-4 transition-colors duration-200 ease-in-out hover:bg-neutral-100">
          <FaUsers className="h-10 w-10" />
        </button>
        <button className="flex flex-1 justify-center p-2 px-4 transition-colors duration-200 ease-in-out hover:bg-neutral-100">
          <Avatar user={user!} />
        </button>
      </div>
    </nav>
  );
};

export default MobileFooter;
