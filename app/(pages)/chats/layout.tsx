import Sidebar from '@/components/Sidebar';
import FriendsList from './FriendsList';

interface Props {
	children: React.ReactNode;
}
const ChatLayout = ({ children }: Props) => {
	return (
		<main className='grid h-screen grid-cols-[70px_300px_auto]'>
			<Sidebar />
			<FriendsList />
			{children}
		</main>
	);
};

export default ChatLayout;
