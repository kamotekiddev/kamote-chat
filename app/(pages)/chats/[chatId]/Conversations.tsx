import Image from 'next/image';

const ConversationBubble = ({ seen, sender, body, image }: Message) => {
	return (
		<div className='flex gap-2'>
			<div className='h-10 w-10 rounded-lg bg-indigo-50'></div>
			<div className='max-w-lg rounded-lg bg-indigo-50 p-2 px-4 text-gray-900'>
				{image && <Image src={image} alt='Message Image' />}
				<p>{body && body}</p>
				{seen && (
					<div className='mt-2 flex justify-end'>
						{seen.map((s) => (
							<div className='h-5 w-5 rounded-full bg-indigo-200' key={s.id} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

interface Props {
	messages: Message[];
}
const Conversations = ({ messages }: Props) => {
	return (
		<div className='grid content-end gap-2'>
			{messages?.map((message) => (
				<ConversationBubble key={message?.id} {...message} />
			))}
		</div>
	);
};

export default Conversations;
