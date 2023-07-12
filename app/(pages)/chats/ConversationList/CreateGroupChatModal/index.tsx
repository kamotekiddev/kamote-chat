"use client";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";

import { User } from "@prisma/client";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import UserSelection from "./UserSelection";
import _ from "lodash";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

interface FieldValues {
  name: string;
  members: User[];
}

const CreateGroupChatModal = ({ onClose, users, ...props }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<FieldValues>({ name: "", members: [] });

  const handleSelectUser = (user: User) => {
    if (_.some(data.members, { id: user.id })) return null;
    setData((prevData) => ({
      ...prevData,
      members: [...prevData.members, user],
    }));
  };

  const handleRemoveSelectedUser = (user: User) => {
    setData((prevData) => ({
      ...prevData,
      members: prevData.members.filter((member) => member.id !== user.id),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        members: data.members.map((member) => member.id),
        isGroup: true,
      })
      .then(() => onClose())
      .catch((err: AxiosError) =>
        setError(
          (err?.response?.data as string) ||
            err?.message ||
            "Internal Server Error"
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <Modal onClose={onClose} {...props}>
      <form onSubmit={handleSubmit}>
        <header>
          <h1 className="text-lg font-semibold leading-7">Create Group Chat</h1>
          <p className="text-sm">Create a chat with more then 2 people</p>
        </header>
        <div className="mt-4 space-y-4">
          <Input
            value={data.name}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
            type="text"
            name="name"
            label="Group Name"
          />
          <UserSelection
            users={users}
            selectedUsers={data.members}
            onSelect={handleSelectUser}
            onRemove={handleRemoveSelectedUser}
          />
        </div>
        {error && (
          <div className="mt-4 rounded-lg bg-rose-50 p-2 px-4 text-rose-500">
            {error}
          </div>
        )}
        <footer className="mt-4 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex justify-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
          >
            Create
          </button>
        </footer>
      </form>
    </Modal>
  );
};

export default CreateGroupChatModal;
