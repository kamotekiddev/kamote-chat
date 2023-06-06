'use client';
import { useParams } from 'next/navigation';
import { Conversation, User, Message } from '@prisma/client';
import ConversationListItem from './ConversationListItem';

interface FullMessageType extends Message {
	sender: User;
	seenByUsers: User[];
}

export interface FullConversation extends Conversation {
	users: User[];
	messages: FullMessageType[];
}
interface Props {
	conversations?: FullConversation[];
}
const ConversationList = ({ conversations }: Props) => {
	const { chatId } = useParams();

	return (
		<div className='w-full bg-indigo-50/10 p-4'>
			<header className='mb-5 px-2'>
				<h1 className='prose-lg font-bold'>Messages</h1>
			</header>
			<div>
				{conversations?.map((conversation) => (
					<ConversationListItem
						key={conversation?.id}
						conversation={conversation}
						isActive={chatId === conversation?.id}
					/>
				))}
			</div>
		</div>
	);
};

export default ConversationList;
