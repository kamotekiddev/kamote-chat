'use client';

import { useState } from 'react';

import { friends } from '@/data/friends';
import EmptyState from '@/components/EmptyState';
import TypingBox from './TypingBox';
import ChatHeader from './ChatHeader';

interface Props {
	params: {
		chatId: string;
	};
}

const Chat = ({ params: { chatId } }: Props) => {
	const [message, setMessage] = useState('');
	const chatMate = friends.find((friend) => friend.id === parseInt(chatId));

	const handleSend = () => setMessage('');

	return (
		<div className='grid h-full grid-rows-[auto_1fr_auto] p-4'>
			<ChatHeader>{chatMate?.name}</ChatHeader>
			<EmptyState
				title='No Coversations Yet'
				message='Start you first connversation by typing a message.'
			/>
			<TypingBox
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder='Type here...'
				onSend={handleSend}
			/>
		</div>
	);
};

export default Chat;
