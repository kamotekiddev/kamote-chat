"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut } from "next-auth/react";

import { User } from "@prisma/client";
import Avatar from "../Avatar";
import useRoutes from "@/hooks/useRoutes";

interface Props {
  user: User | null;
}

const MobileFooter = ({ user }: Props) => {
  const routes = useRoutes();

  const handleLogout = () => signOut();
  return (
    <nav className="lg:hidden">
      <div className="flex">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={twMerge(
              "flex flex-1 justify-center p-2 px-4 transition-colors duration-200 ease-in-out hover:bg-neutral-100",
              route?.isActive &&
                "bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white"
            )}
          >
            <route.icon className="h-8 w-8" />
          </Link>
        ))}
        <Menu as="div" className="relative inline-block flex-1">
          <Menu.Button className="mx-auto flex h-full items-center ">
            <Avatar user={user!} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -top-full right-10 mb-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-neutral-100 text-black" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default MobileFooter;
