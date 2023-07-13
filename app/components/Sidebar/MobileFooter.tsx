"use client";

import { User } from "@prisma/client";
import Avatar from "../Avatar";
import useRoutes from "@/hooks/useRoutes";
import Link from "next/link";

interface Props {
  user: User | null;
}

const MobileFooter = ({ user }: Props) => {
  const routes = useRoutes();
  return (
    <nav className="lg:hidden">
      <div className="flex">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className="flex flex-1 justify-center p-2 px-4 transition-colors duration-200 ease-in-out hover:bg-neutral-100"
          >
            <route.icon className="h-8 w-8" />
          </Link>
        ))}
        <button className="flex flex-1 justify-center p-2 px-4 transition-colors duration-200 ease-in-out hover:bg-neutral-100">
          <Avatar user={user!} />
        </button>
      </div>
    </nav>
  );
};

export default MobileFooter;
