'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Input from '@/components/Input';

interface Credentials {
	email: string;
	password: string;
}

export default function SignIn() {
	const [creds, setCreds] = useState<Credentials>({
		email: '',
		password: '',
	});
	const router = useRouter();
	const [submitting, setSubmiting] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setSubmiting(true);
		signIn('credentials', {
			...creds,
			redirect: false,
			callbackUrl: '/chats',
		})
			.then((response) => {
				if (response?.error) setError(response.error);
				router.replace(response?.url as string);
			})
			.catch((error) => {
				setError('Internal Server Error');
			})
			.finally(() => setSubmiting(false));
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
					Sign In to your account
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form onSubmit={handleSubmit} className='space-y-6' method='POST'>
					<Input
						onChange={(e) =>
							setCreds((cred) => ({ ...cred, email: e.target.value }))
						}
						value={creds.email}
						type='text'
						label='Email Address'
						name='email'
					/>
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
						<Input
							onChange={(e) =>
								setCreds((cred) => ({ ...cred, password: e.target.value }))
							}
							value={creds.password}
							type='password'
							name='password'
						/>
					</div>

					{error && (
						<div className='rounded-lg bg-rose-500 p-2 px-4 text-white'>
							{error}
						</div>
					)}
					<div>
						<button
							type='submit'
							disabled={submitting}
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-default disabled:opacity-50'
						>
							{submitting ? 'Signing In' : 'Sign In'}
						</button>
					</div>
				</form>
				<p className='mt-10 text-center text-sm text-gray-500'>
					Not a member?
					<a
						href='/sign-up'
						className='ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Create Account
					</a>
				</p>
			</div>
		</div>
	);
}
