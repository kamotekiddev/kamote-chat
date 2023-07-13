"use client";

import _ from "lodash";
import { Fragment, useMemo, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { Conversation, User } from "@prisma/client";
import { Menu, Transition } from "@headlessui/react";

import useActiveUserList from "@/hooks/useActiveUserList";
import useOtherUsers from "@/hooks/useOtherUsers";
import Avatar from "@/components/Avatar";
import DeleteConversationModal from "./DeleteConversationModal";

interface Props {
  conversation: Conversation & { users: User[] };
}

const ChatHeader = ({ conversation }: Props) => {
  const otherUsers = useOtherUsers(conversation.users);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { members } = useActiveUserList();

  const isActive = _.includes(members, otherUsers[0]?.email);

  const status = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;
    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  const handleDeleteConversation = () => setShowDeleteModal(true);

  return (
    <>
      <header className="flex justify-between gap-4 p-4 shadow-sm">
        <div className="flex items-center gap-5">
          <Avatar user={otherUsers[0]} />
          <div>
            <h1 className="text-sm font-medium leading-none">
              {conversation.name || otherUsers[0]?.name}
            </h1>
            <p className="text-xs text-gray-500">{status}</p>
          </div>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md  p-2 text-sm font-medium hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <FiMoreHorizontal className="h-5 w-5" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDeleteConversation}
                      className={`${
                        active ? "bg-neutral-100 text-black" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete Conversation
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </header>
      <DeleteConversationModal
        isOpen={showDeleteModal}
        conversationId={conversation.id}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default ChatHeader;
