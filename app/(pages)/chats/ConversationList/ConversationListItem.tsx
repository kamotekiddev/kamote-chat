import Avatar from '@/components/Avatar';
import { FullConversation } from '.';
import { twMerge } from 'tailwind-merge';

interface Props {
	conversation: FullConversation;
	isActive?: boolean;
}

const ConversationListItem = ({ conversation, isActive }: Props) => {
	return (
		<button
			className={twMerge(
				'flex w-full gap-4 rounded-lg p-2 hover:bg-neutral-100',
				isActive && 'bg-neutral-100'
			)}
		>
			<Avatar user={conversation?.users[1]} />
			<h1 className='prose-sm'>
				{conversation?.name || conversation?.users[1]?.name}
			</h1>
		</button>
	);
};

export default ConversationListItem;
