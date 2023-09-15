import { useParams } from "next/navigation";

const useConversation = () => {
  const params = useParams();

  const isOpen = !!params?.chatId;

  return { chatId: params?.chatId, isOpen };
};

export default useConversation;
