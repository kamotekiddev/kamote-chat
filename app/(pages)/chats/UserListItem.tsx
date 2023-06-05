import Avatar from '@/components/Avatar';
import { User } from '@prisma/client';

interface Props {
	user: User;
	onSelect: (fried: User) => void;
}

const UserListItem = ({ user, onSelect }: Props) => {
	return (
		<button
			onClick={() => onSelect(user)}
			className='flex w-full items-center gap-4 rounded-lg p-2 text-left hover:bg-neutral-100'
		>
			<Avatar user={user} />
			<h1 className='prose-sm'>{user.name}</h1>
		</button>
	);
};

export default UserListItem;
