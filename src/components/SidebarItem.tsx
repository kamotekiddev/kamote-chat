import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { IconType } from 'react-icons';

interface Props extends LinkProps {
	href: string;
	icon: IconType;
	isActive: boolean;
}

const SidebarItem = ({ href, isActive, icon: Icon, ...props }: Props) => {
	return (
		<Link href={href} {...props}>
			<button
				className={clsx(
					'group block rounded-lg p-2 transition-all duration-75 ease-linear hover:bg-white',
					isActive && 'bg-white'
				)}
			>
				{Icon && (
					<Icon
						className={clsx(
							'h-7 w-7 text-indigo-500 group-hover:text-indigo-600',
							isActive && 'text-indigo-600'
						)}
					/>
				)}
			</button>
		</Link>
	);
};

export default SidebarItem;
