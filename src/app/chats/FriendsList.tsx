import moment from 'moment';
import { FiUsers } from 'react-icons/fi';
import FriendsListItem from './FriendsListItem';

interface Props {}

const friends = [
	{
		id: 1,
		name: 'Joshua Dela Cruz',
		isOnline: true,
		lastOnline: moment().toString(),
	},
	{
		id: 1,
		name: 'Ezekiel The Kamote',
		isOnline: false,
		lastOnline: moment().startOf('day').toString(),
	},
];

const FriendsList = ({}: Props) => {
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
					<FriendsListItem key={friend.id} friend={friend} />
				))}
			</div>
		</div>
	);
};

export default FriendsList;
