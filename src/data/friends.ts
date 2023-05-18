import moment from 'moment';

export const friends: Friend[] = [
	{
		id: 1,
		name: 'Joshua Dela Cruz',
		isOnline: true,
		lastOnline: moment().toString(),
	},
	{
		id: 2,
		name: 'Ezekiel The Kamote',
		isOnline: false,
		lastOnline: moment().startOf('day').toString(),
	},
];
