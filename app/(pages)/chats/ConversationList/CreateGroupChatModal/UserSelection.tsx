import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface Props {
	label: string;
	name: string;
	users: { name: string; id: string }[];
	selectedUsers: string[];
	onChange: (members: string[]) => void;
}
const UserSelection = ({
	label,
	name,
	users,
	selectedUsers,
	onChange,
}: Props) => {
	const [query, setQuery] = useState('');

	const filteredUsers = !query
		? users
		: users.filter((user) =>
				user.name
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(query.toLowerCase().replace(/\s+/g, ''))
		  );

	return (
		<div>
			{label && (
				<label
					htmlFor={name}
					className='block text-sm font-medium leading-6 text-gray-900'
				>
					{label}
				</label>
			)}

			<Combobox
				multiple
				value={selectedUsers}
				onChange={(newValue) => onChange([...newValue])}
			>
				<div className='relative mt-1'>
					<div className='5 relative w-full cursor-default overflow-hidden rounded-md border-[2px] border-gray-300 bg-white text-left focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 '>
						<Combobox.Input
							className='w-full border-none py-1.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
							displayValue={() =>
								users
									.filter((user) => selectedUsers.includes(user.id))
									.map((user) => user.name.split(' ')[0])
									.join(', ')
							}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<FiChevronDown
								className='h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className='absolute z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{!filteredUsers.length && query ? (
								<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
									Nothing found.
								</div>
							) : (
								filteredUsers.map((filteredUser) => (
									<Combobox.Option
										key={filteredUser.id}
										className={twMerge(
											`relative cursor-pointer select-none py-2 pl-10 pr-4`,
											selectedUsers.includes(filteredUser.id) &&
												'bg-indigo-600 text-white'
										)}
										value={filteredUser.id}
										onClick={() => {
											selectedUsers.includes(filteredUser.id) &&
												onChange(
													selectedUsers.filter(
														(selectedUser) => selectedUser !== filteredUser.id
													)
												);

											console.log(selectedUsers.includes(filteredUser.id));
										}}
									>
										{filteredUser.name}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default UserSelection;
