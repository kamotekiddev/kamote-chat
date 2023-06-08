import { twMerge } from 'tailwind-merge';

import { FullConversation } from '.';
import useOtherUsers from '@/hooks/useOtherUsers';
import Avatar from '@/components/Avatar';
import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

interface Props {
	conversation: FullConversation;
	isActive?: boolean;
	onSelect: (id: string) => void;
}

const ConversationListItem = ({ conversation, isActive, onSelect }: Props) => {
	const otherUsers = useOtherUsers(conversation.users);
	const session = useSession();

	const lastMessage = useMemo(() => {
		const messages = conversation.messages || [];
		return messages[messages.length - 1];
	}, [conversation.messages]);

	const userEmail = useMemo(
		() => session.data?.user?.email,
		[session.data?.user?.email]
	);

	const hasSeen = useMemo(() => {
		if (!lastMessage) return false;
		if (!userEmail) return false;

		const seen = lastMessage.seenByUsers || [];
		return seen.some((user) => user.email === userEmail);
	}, [lastMessage, userEmail]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) return 'Sent an Image';
		if (lastMessage?.body) return lastMessage.body;
		return 'Started a Conversation';
	}, [lastMessage]);

	return (
		<button
			className={twMerge(
				'w-full rounded-lg p-3 transition hover:bg-neutral-100',
				isActive && 'bg-neutral-100'
			)}
			onClick={() => onSelect && onSelect(conversation.id)}
		>
			<div className='flex items-center gap-4'>
				<Avatar user={otherUsers[0]} />
				<div>
					<div className='flex flex-1 justify-between gap-2'>
						<h1 className='prose-sm truncate font-medium'>
							{conversation?.name || otherUsers[0].name}
						</h1>
						{lastMessage?.createdAt && (
							<span className='text-xs text-gray-400'>
								{format(new Date(lastMessage?.createdAt), 'p')}
							</span>
						)}
					</div>
					<p
						className={twMerge(
							'text-black-500 truncate text-sm font-medium',
							hasSeen && 'font-normal text-gray-500'
						)}
					>
						{lastMessageText}
					</p>
				</div>
			</div>
		</button>
	);
};

export default ConversationListItem;
