'use client';
import axios from 'axios';
import { useState } from 'react';

import { User } from '@prisma/client';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import UserSelection from './UserSelection';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	users: User[];
}

interface FieldValues {
	name: string;
	members: string[];
}

const CreateGroupChatModal = ({ onClose, users, ...props }: Props) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [data, setData] = useState<FieldValues>({ name: '', members: [] });

	const handleSubmit = () => {
		setLoading(true);
		axios
			.post('/api/conversations', {
				...data,
				isGroup: true,
			})
			.then((response) => {
				router.refresh();
				onClose();
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};

	return (
		<Modal onClose={onClose} {...props}>
			<form onSubmit={handleSubmit}>
				<header>
					<h1 className='text-lg font-semibold leading-7'>Create Group Chat</h1>
					<p className='text-sm'>Create a chat with more then 2 people</p>
				</header>
				<div className='mt-4 space-y-4'>
					<Input
						value={data.name}
						onChange={(e) =>
							setData((prevData) => ({
								...prevData,
								name: e.target.value,
							}))
						}
						type='text'
						name='name'
						label='Group Name'
					/>
					<UserSelection
						name='users'
						selectedUsers={data.members}
						label='Users'
						users={users.map(({ id, name }) => ({ id, name: name as string }))}
						onChange={(members) =>
							setData((prevData) => ({
								...prevData,
								members,
							}))
						}
					/>
				</div>
				<footer className='mt-4 flex justify-between gap-4'>
					<button onClick={onClose}>Cancel</button>
					<button type='submit'>Create</button>
				</footer>
			</form>
		</Modal>
	);
};

export default CreateGroupChatModal;
