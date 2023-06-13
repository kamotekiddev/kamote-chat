'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiUserPlus } from 'react-icons/fi';
import { Conversation, User, Message } from '@prisma/client';

import ConversationListItem from './ConversationListItem';
import CreateGroupChatModal from './CreateGroupChatModal';

interface FullMessageType extends Message {
	sender: User;
	seenByUsers: User[];
}

export interface FullConversation extends Conversation {
	users: User[];
	messages: FullMessageType[];
}
interface Props {
	conversations?: FullConversation[];
	users: User[];
}
const ConversationList = ({ conversations, users }: Props) => {
	const router = useRouter();
	const { chatId } = useParams();
	const [isModalOpen, setModalOpen] = useState(false);

	const handleSelectConversation = (id: string) => router.push(`/chats/${id}`);

	return (
		<>
			<div className='w-full bg-indigo-50/10 p-4'>
				<header
					className='mb-5 flex justify-between gap-4 px-2'
					onClick={() => setModalOpen(true)}
				>
					<h1 className='prose-lg font-bold'>Messages</h1>
					<button className='inline-grid h-8 w-8 place-items-center rounded-lg transition-colors duration-100  ease-in hover:bg-gray-100'>
						<FiUserPlus />
					</button>
				</header>
				<div>
					{conversations?.map((conversation) => (
						<ConversationListItem
							key={conversation.id}
							conversation={conversation}
							isActive={chatId === conversation.id}
							onSelect={handleSelectConversation}
						/>
					))}
				</div>
			</div>
			<CreateGroupChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</>
	);
};

export default ConversationList;
