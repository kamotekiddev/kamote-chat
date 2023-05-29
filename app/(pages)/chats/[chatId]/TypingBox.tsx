import { ComponentProps, FormEvent } from 'react';

interface Props extends ComponentProps<'input'> {
	onSend: () => void;
}

const TypingBox = ({ onSend, ...props }: Props) => {
	const handleSend = (e: FormEvent) => {
		e.preventDefault();
		onSend();
	};

	return (
		<form onSubmit={handleSend} className='relative flex'>
			<input
				type='text'
				className='w-full rounded-lg border-none bg-indigo-50 p-3 px-4 pr-24 outline-none'
				{...props}
			/>
			<button
				type='submit'
				className='absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 p-1 px-4 text-indigo-50 transition-colors duration-75 ease-linear hover:bg-indigo-700 hover:text-white'
			>
				Send
			</button>
		</form>
	);
};

export default TypingBox;
