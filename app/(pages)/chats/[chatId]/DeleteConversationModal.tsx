import { useState } from "react";
import Modal from "@/components/Modal";
import axios from "axios";

interface Props {
  conversationId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConversationModal = ({ conversationId, ...props }: Props) => {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConversation = async () => {
    setDeleting(true);
    const response = await axios.delete(`/api/conversations/${conversationId}`);
    if (response.status < 400) props.onClose();
  };

  return (
    <Modal {...props}>
      <div className="space-y-4">
        <header>
          <h1 className="mb-sm text-lg font-medium">Delete Conversation</h1>
          <p className="text-sm">
            Are you sure you want to delete this conversation?
          </p>
        </header>
        <div className="flex justify-between gap-2">
          <button
            onClick={props.onClose}
            className="flex justify-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            disabled={deleting}
            onClick={handleDeleteConversation}
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
          >
            Yes, I am Sure
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConversationModal;
