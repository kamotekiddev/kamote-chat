'use client';

import { useMemo } from 'react';
import { Conversation, User } from '@prisma/client';
import useOtherUsers from '@/hooks/useOtherUsers';
import Avatar from '@/components/Avatar';

interface Props {
	conversation: Conversation & { users: User[] };
}
const ChatHeader = ({ conversation }: Props) => {
	const otherUsers = useOtherUsers(conversation.users);

	const status = useMemo(() => {
		if (conversation.isGroup) return `${conversation.users.length} members`;
		return 'Active';
	}, [conversation]);

	return (
		<header className='gap-4 p-4 shadow-sm'>
			<div className='flex items-center gap-5'>
				<Avatar user={otherUsers[0]} />
				<div>
					<h1 className='text-sm font-medium leading-none'>
						{conversation.name || otherUsers[0]?.name}
					</h1>
					<p className='text-xs text-gray-500'>{status}</p>
				</div>
			</div>
		</header>
	);
};

export default ChatHeader;
