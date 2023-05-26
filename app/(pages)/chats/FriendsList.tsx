'use client';

import { FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { friends } from '@/data/friends';
import FriendsListItem from './FriendsListItem';

const FriendsList = () => {
	const router = useRouter();
	const handleSelectFriend = (friend: User) =>
		router.push(`/chats/${friend.id}`);

	return (
		<div className='w-full bg-indigo-50/10 p-4'>
			<header className='flex items-center justify-between px-4'>
				<h1 className='prose-lg font-bold'>Friends</h1>
				<button className='inline-grid h-8 w-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600 transition-all duration-100 ease-linear hover:bg-gray-200'>
					<FiUsers />
				</button>
			</header>
			<div className='mt-5 space-y-2'>
				{friends.map((friend) => (
					<FriendsListItem
						key={friend.id}
						friend={friend}
						onSelectFriend={handleSelectFriend}
					/>
				))}
			</div>
		</div>
	);
};

export default FriendsList;
