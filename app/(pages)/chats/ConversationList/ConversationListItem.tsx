import Avatar from '@/components/Avatar';
import { FullConversation } from '.';

interface Props {
	conversation: FullConversation;
}

const ConversationListItem = ({ conversation }: Props) => {
	return (
		<button className='flex w-full gap-4 rounded-lg p-2 hover:bg-neutral-100'>
			<Avatar user={conversation?.users[1]} />
			<h1 className='prose-sm'>
				{conversation?.name || conversation?.users[1]?.name}
			</h1>
		</button>
	);
};

export default ConversationListItem;
