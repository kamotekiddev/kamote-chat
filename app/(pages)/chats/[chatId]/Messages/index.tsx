import { Message, User } from '@prisma/client';
import MessageBox from './MessageBox';
import EmptyState from '@/components/EmptyState';

export interface FullMessage extends Message {
	sender: User;
	seenByUsers: User[];
}

interface Props {
	messages: FullMessage[];
}
const Messages = ({ messages }: Props) => {
	if (!messages.length)
		return (
			<EmptyState
				title='Started a Conversation'
				message='Start typing and send a message to each other'
			/>
		);

	return (
		<div>
			{messages.map((message) => (
				<MessageBox key={message.id} message={message} />
			))}
		</div>
	);
};

export default Messages;
