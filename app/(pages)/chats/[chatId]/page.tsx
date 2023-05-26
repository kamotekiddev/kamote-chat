'use client';

import moment from 'moment';
import { useState } from 'react';

import { friends } from '@/data/friends';
import EmptyState from '@/components/EmptyState';
import TypingBox from './TypingBox';
import ChatHeader from './ChatHeader';
import Conversations from './Conversations';

interface Props {
	params: {
		chatId: string;
	};
}

const messages: Message[] = [
	{
		id: 1,
		seen: [
			{
				id: 1,
				name: 'Joshua Dela Cruz',
				isOnline: false,
				lastOnline: moment().toString(),
			},
			{
				id: 2,
				name: 'Kamote Kid',
				isOnline: false,
				lastOnline: moment().toString(),
			},
			{
				id: 3,
				name: 'The Man',
				isOnline: false,
				lastOnline: moment().toString(),
			},
		],
		body: 'Hello there body? how are you today? are you good?',
		sender: {
			id: 1,
			name: 'Joshua Dela Cruz',
			isOnline: false,
			lastOnline: moment().toString(),
		},
	},
	{
		id: 2,
		seen: [
			{
				id: 1,
				name: 'Joshua Dela Cruz',
				isOnline: false,
				lastOnline: moment().toString(),
			},
			{
				id: 2,
				name: 'Kamote Kid',
				isOnline: false,
				lastOnline: moment().toString(),
			},
			{
				id: 3,
				name: 'The Man',
				isOnline: false,
				lastOnline: moment().toString(),
			},
		],
		body: 'Hey, why are you not replying on my messages?',
		sender: {
			id: 1,
			name: 'Joshua Dela Cruz',
			isOnline: false,
			lastOnline: moment().toString(),
		},
	},
	{
		id: 3,
		seen: [
			{
				id: 1,
				name: 'Joshua Dela Cruz',
				isOnline: false,
				lastOnline: moment().toString(),
			},
			{
				id: 2,
				name: 'Kamote Kid',
				isOnline: false,
				lastOnline: moment().toString(),
			},
			{
				id: 3,
				name: 'The Man',
				isOnline: false,
				lastOnline: moment().toString(),
			},
		],
		body: "Are you mad at me or something? why do'nt you tell me whats wrong so that I know what to do.",
		sender: {
			id: 1,
			name: 'Joshua Dela Cruz',
			isOnline: false,
			lastOnline: moment().toString(),
		},
	},
];

const Chat = ({ params: { chatId } }: Props) => {
	const [message, setMessage] = useState('');
	const chatMate = friends.find((friend) => friend.id === parseInt(chatId));

	const handleSend = () => setMessage('');

	const content =
		messages.length > 0 ? (
			<Conversations messages={messages} />
		) : (
			<EmptyState
				title='No Coversations Yet'
				message='Start you first connversation by typing a message.'
			/>
		);

	return (
		<div className='grid h-full grid-rows-[auto_1fr_auto] gap-5 p-4'>
			<ChatHeader>{chatMate?.name}</ChatHeader>
			{content}
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
