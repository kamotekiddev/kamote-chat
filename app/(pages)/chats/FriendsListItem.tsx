import moment from 'moment';

interface Props {
	friend: User;
	onSelectFriend: (fried: User) => void;
}

moment.updateLocale('en', {
	relativeTime: {
		past: '%s ago',
		ss: '%s sec',
		m: '1 min',
		mm: '%d mins',
		h: '1hr',
		hh: '%d hrs',
		d: '1day',
		dd: '%d days',
		w: '1week',
		ww: '%d weeks',
		M: '1month',
		MM: '%d months',
		y: '1year',
		yy: '%d years',
	},
});

const FriendsListItem = ({ friend, onSelectFriend }: Props) => {
	const subTitle = friend.isOnline
		? 'Online'
		: moment(friend.lastOnline).fromNow();

	return (
		<button
			onClick={() => onSelectFriend(friend)}
			className='block w-full rounded-lg p-2 px-4 text-left hover:bg-indigo-50'
		>
			<h1 className='prose-md font-medium'>{friend.name}</h1>
			<span className='text-sm'>{subTitle}</span>
		</button>
	);
};

export default FriendsListItem;
