"use client";

import { FormEvent, useState } from "react";

interface Props {
  conversationId: string;
}

const TypingBox = ({ conversationId }: Props) => {
  const [sending, setSending] = useState(false);
  const [text, setText] = useState("");

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();

    setSending(true);
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ message: text, conversationId }),
    });
    setText("");
    setSending(false);
  };

  return (
    <form onSubmit={handleSend} className="relative mb-4 flex px-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Start Typing"
        disabled={sending}
        className="w-full rounded-lg border-none bg-indigo-50 p-3 px-4 pr-24 outline-none"
      />
      <button
        type="submit"
        disabled={sending}
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 p-1 px-4 text-indigo-50 transition-colors duration-75 ease-linear hover:bg-indigo-700 hover:text-white"
      >
        {sending ? "Sending" : "Send"}
      </button>
    </form>
  );
};

export default TypingBox;
