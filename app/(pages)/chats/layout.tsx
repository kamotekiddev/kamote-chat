import getConversations from '@/libs/getConversations';
import Sidebar from '@/components/Sidebar';
import ConversationList from './ConversationList';

interface Props {
	children: React.ReactNode;
}
const ChatLayout = async ({ children }: Props) => {
	const conversations = await getConversations();

	return (
		<main className='grid h-screen grid-cols-[200px_300px_auto]'>
			<Sidebar />
			<ConversationList conversations={conversations} />
			{children}
		</main>
	);
};

export default ChatLayout;
