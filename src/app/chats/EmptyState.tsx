import { BsChatText } from 'react-icons/bs';

const EmptyState = () => {
	return (
		<main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<BsChatText className='h-32 w-32 text-gray-900' />
				<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
					No Open Coversation
				</h1>
				<p className='mt-6 text-base leading-7 text-gray-600'>
					Please select a friend to start with a coversation.
				</p>
			</div>
		</main>
	);
};

export default EmptyState;
