import getConversationById from '@/libs/getConversationById';
import ChatHeader from './ChatHeader';
import EmptyState from '@/components/EmptyState';

interface Props {
	params: {
		chatId: string;
	};
}

const Chat = async ({ params: { chatId } }: Props) => {
	const conversation = await getConversationById(chatId);

	if (!conversation) return <EmptyState />;

	return (
		<div className='grid h-full grid-rows-[auto_1fr_auto] gap-5'>
			<ChatHeader conversation={conversation} />
		</div>
	);
};

export default Chat;
