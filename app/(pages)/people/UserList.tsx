'use client';

import { useRouter } from 'next/navigation';

import UserListItem from './UserListItem';
import { Conversation, User } from '@prisma/client';

interface Props {
	users?: User[];
}
const UserList = ({ users }: Props) => {
	const router = useRouter();

	const handleSelect = async (user: User) => {
		const response = await fetch('/api/conversations', {
			method: 'POST',
			body: JSON.stringify({ userId: user?.id }),
		});
		const data: Conversation = await response.json();
		if (!data) return null;
		router.push(`/chats/${data?.id}`);
	};

	if (!users?.length) return null;

	return (
		<div className='w-full bg-indigo-50/10 p-4'>
			<header className='px-2'>
				<h1 className='prose-lg font-bold'>People</h1>
			</header>
			<div className='mt-5 space-y-2'>
				{users.map((user) => (
					<UserListItem key={user.id} user={user} onSelect={handleSelect} />
				))}
			</div>
		</div>
	);
};

export default UserList;