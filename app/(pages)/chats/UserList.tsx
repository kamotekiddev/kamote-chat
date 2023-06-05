'use client';

import { useRouter } from 'next/navigation';

import UserListItem from './UserListItem';
import { User } from '@prisma/client';

interface Props {
	users?: User[];
}
const UserList = ({ users }: Props) => {
	const router = useRouter();
	const handleSelectFriend = (friend: User) =>
		router.push(`/chats/${friend.id}`);

	if (!users?.length) return null;

	return (
		<div className='w-full bg-indigo-50/10 p-4'>
			<header className='flex items-center justify-between px-4'>
				<h1 className='prose-lg font-bold'>People</h1>
			</header>
			<div className='mt-5 space-y-2'>
				{users.map((user) => (
					<UserListItem
						key={user.id}
						user={user}
						onSelectFriend={handleSelectFriend}
					/>
				))}
			</div>
		</div>
	);
};

export default UserList;
