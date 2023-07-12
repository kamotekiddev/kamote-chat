"use client";

import { Fragment } from "react";
import { signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { User } from "@prisma/client";
import Avatar from "./Avatar";

interface Props {
  user: User | null;
}

const UserButton = ({ user }: Props) => {
  if (!user) return null;

  const handleLogout = () => {
    signOut();
  };

  return (
    <Menu as="div" className="relative inline-block w-full text-left">
      <Menu.Button className="grid grid-cols-[auto_1fr] items-center gap-4 overflow-hidden rounded-lg p-3 transition-colors duration-200 ease-linear hover:bg-white">
        <Avatar user={user} />
        <div className="flex-1 overflow-hidden text-left">
          <h1 className="prose-sm truncate font-medium">{user.name}</h1>
          <p className="truncate text-sm">{user.email}</p>
        </div>
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
        <Menu.Items className="absolute -top-full right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
  );
};

export default UserButton;
