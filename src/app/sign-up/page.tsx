'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios, { AxiosError } from 'axios';

export default function SignUp() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>();

	const clearForm = () => {
		setEmail('');
		setName('');
		setPassword('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			await axios.post('/api/register', {
				email,
				name,
				password,
			});
			setIsError(true);
			setSubmitting(false);
			clearForm();
			router.replace('/');
		} catch (error) {
			setSubmitting(false);
			setIsError(true);
			if (error instanceof AxiosError) setError(error);
		}
	};

	return (
		<div className='flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Image
					width={80}
					height={10}
					className='mx-auto'
					src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
					alt='Your Company'
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign Up for Account
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
					action='#'
					method='POST'
				>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Name
						</label>
						<div className='mt-2'>
							<input
								id='name'
								name='name'
								type='text'
								autoComplete='email'
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
							<div className='text-sm'>
								<a
									href='#'
									className='font-semibold text-indigo-600 hover:text-indigo-500'
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					{isError && (
						<div className='rounded-lg bg-rose-500 p-2 px-4 text-white'>
							{error?.response?.data as string}
						</div>
					)}
					<div>
						<button
							type='submit'
							disabled={submitting}
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-default disabled:opacity-50'
						>
							{submitting ? 'Signing Up...' : 'Sign Up'}
						</button>
					</div>
				</form>
				<p className='mt-10 text-center text-sm text-gray-500'>
					Already a member?
					<a
						href='/'
						className='ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Sign In
					</a>
				</p>
			</div>
		</div>
	);
}
