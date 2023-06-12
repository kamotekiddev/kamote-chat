'use client';

import { Transition, Dialog } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Size = 'small' | 'medium' | 'large' | 'full';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	size?: Size;
}

const getSizeStyle = (size?: Size) => {
	switch (size) {
		case 'small':
			return 'max-w-sm';
		case 'medium':
			return 'max-w-md';
		case 'large':
			return 'max-w-lg';
		case 'full':
			return '';
		default:
			return 'max-w-md';
	}
};

const Modal = ({ isOpen, onClose, children, size }: Props) => {
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={onClose}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel
									className={twMerge(
										'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
										getSizeStyle(size)
									)}
								>
									{children}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Modal;
