"use client";

import { FormEvent, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSentMessage: (text: string) => void;
}

const TypingBox = ({ value, onChange, onSentMessage }: Props) => {
  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (onSentMessage) onSentMessage(value);
  };

  return (
    <form onSubmit={handleSend} className="relative mb-4 flex px-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Start Typing"
        className="w-full rounded-lg border-none bg-indigo-50 p-3 px-4 pr-24 outline-none"
      />
      <button
        type="submit"
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 p-1 px-4 text-indigo-50 transition-colors duration-75 ease-linear hover:bg-indigo-700 hover:text-white"
      >
        Send
      </button>
    </form>
  );
};

export default TypingBox;
