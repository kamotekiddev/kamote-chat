import { useParams } from "next/navigation";
import { useState } from "react";

const useConversation = () => {
  const { chatId } = useParams();

  const isOpen = !!chatId;

  return { chatId, isOpen };
};

export default useConversation;
