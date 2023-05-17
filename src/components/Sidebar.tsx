'use client';

import { usePathname } from 'next/navigation';
import { FiUsers, FiLogOut, FiMessageCircle } from 'react-icons/fi';

import SidebarItem from './SidebarItem';

const routes = [
	{ icon: FiMessageCircle, pathname: '/chats' },
	{ icon: FiUsers, pathname: '/friends' },
	{ icon: FiLogOut, pathname: '/' },
];

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className='grid content-start justify-items-center gap-4 bg-indigo-50/40 p-4'>
			{routes.map((route, i) => (
				<SidebarItem
					key={i}
					href={route.pathname}
					icon={route.icon}
					isActive={pathname === route.pathname}
				/>
			))}
		</div>
	);
};

export default Sidebar;
