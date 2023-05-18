import { FormEvent, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	onSend: () => void;
}

const TypingBox = ({ onSend, ...props }: Props) => {
	const handleSend = (e: FormEvent) => {
		e.preventDefault();
		onSend();
	};

	return (
		<form onSubmit={handleSend} className='relative flex'>
			<input type='text' className='w-full rounded-lg pr-24' {...props} />
			<button
				type='submit'
				className='absolute right-1 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 p-1 px-4 text-indigo-50 transition-colors duration-75 ease-linear hover:bg-indigo-700 hover:text-white'
			>
				Send
			</button>
		</form>
	);
};

export default TypingBox;
