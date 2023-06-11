'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Message, User } from '@prisma/client';
import MessageBox from './MessageBox';
import EmptyState from '@/components/EmptyState';

export interface FullMessage extends Message {
	sender: User;
	seenByUsers: User[];
}

interface Props {
	initialMessages: FullMessage[];
	conversationId: string;
}
const Messages = ({ initialMessages, conversationId }: Props) => {
	const [messages, setMessages] = useState<FullMessage[]>(initialMessages);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	if (!messages.length)
		return (
			<EmptyState
				title='Started a Conversation'
				message='Start typing and send a message to each other'
			/>
		);

	return (
		<div className='flex flex-col justify-end  gap-2 p-4'>
			{messages.map((message) => (
				<MessageBox
					key={message.id}
					isLast={messages[messages.length - 1].id === message.id}
					message={message}
				/>
			))}
			<div ref={bottomRef} />
		</div>
	);
};

export default Messages;
