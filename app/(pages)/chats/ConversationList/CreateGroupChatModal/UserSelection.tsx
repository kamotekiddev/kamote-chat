import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
	label: string;
	name: string;
	users: { name: string; id: string }[];
	selectedUsers: { name: string; id: string }[];
	onChange: (members: { name: string; id: string }[]) => void;
}
const UserSelection = ({
	label,
	name,
	users,
	selectedUsers,
	onChange,
}: Props) => {
	const [query, setQuery] = useState('');

	const filteredOptions = !query
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
				value={users}
				onChange={(newValue) => onChange(newValue)}
			>
				<div className='relative mt-1'>
					<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<Combobox.Input
							className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
							displayValue={(users: { id: string; name: string }[]) =>
								users.map((user) => user.name).join(', ')
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
						<Combobox.Options className='absolute z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{filteredOptions.length === 0 && query !== '' ? (
								<div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
									Nothing found.
								</div>
							) : (
								filteredOptions.map((option) => (
									<Combobox.Option
										disabled={selectedUsers.some(
											(user) => user.id === option.id
										)}
										key={option.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-teal-600 text-white' : 'text-gray-900'
											}`
										}
										value={option}
									>
										{option.name}
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
