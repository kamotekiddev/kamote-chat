import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { FiLogOut } from 'react-icons/fi';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const LogoutIconButton = ({ ...props }: Props) => {
	return (
		<button
			className={clsx(
				'group block rounded-lg p-2 transition-all duration-75 ease-linear hover:bg-white'
			)}
			{...props}
		>
			<FiLogOut
				className={clsx('h-7 w-7 text-indigo-500 group-hover:text-indigo-600')}
			/>
		</button>
	);
};

export default LogoutIconButton;
