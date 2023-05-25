'use client';

import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FiUsers, FiMessageCircle } from 'react-icons/fi';

import SidebarItem from './SidebarItem';
import LogoutIconButton from './LogoutIconButton';

const routes = [
	{ icon: FiMessageCircle, pathname: '/chats' },
	{ icon: FiUsers, pathname: '/friends' },
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
			<LogoutIconButton onClick={() => signOut()} />
		</div>
	);
};

export default Sidebar;
