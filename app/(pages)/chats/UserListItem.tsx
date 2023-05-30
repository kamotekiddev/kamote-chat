import { User } from '@prisma/client';

interface Props {
	user: User;
	onSelectFriend: (fried: User) => void;
}

const UserListItem = ({ user, onSelectFriend }: Props) => {
	return (
		<button
			onClick={() => onSelectFriend(user)}
			className='block w-full rounded-lg p-2 px-4 text-left hover:bg-indigo-50'
		>
			<h1 className='prose-md font-medium'>{user.name}</h1>
		</button>
	);
};

export default UserListItem;
