'use client';

import { FormEvent, useState } from 'react';

const TypingBox = () => {
	const [text, setText] = useState('');

	const handleSend = (e: FormEvent) => {
		e.preventDefault();
		setText('');
	};

	return (
		<form onSubmit={handleSend} className='relative flex p-4'>
			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				type='text'
				placeholder='Start Typing'
				className='w-full rounded-lg border-none bg-indigo-50 p-3 px-4 pr-24 outline-none'
			/>
			<button
				type='submit'
				className='absolute right-6 top-1/2 -translate-y-1/2 rounded-lg bg-indigo-600 p-1 px-4 text-indigo-50 transition-colors duration-75 ease-linear hover:bg-indigo-700 hover:text-white'
			>
				Send
			</button>
		</form>
	);
};

export default TypingBox;
