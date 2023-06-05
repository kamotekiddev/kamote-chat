import getUsers from '@/libs/getUsers';
import Sidebar from '@/components/Sidebar';
import UserList from './UserList';

interface Props {
	children: React.ReactNode;
}
const ChatLayout = async ({ children }: Props) => {
	const users = await getUsers();

	return (
		<main className='grid h-screen grid-cols-[200px_300px_auto]'>
			<Sidebar />
			<UserList users={users} />
			{children}
		</main>
	);
};

export default ChatLayout;
