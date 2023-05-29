'use client';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FiUsers, FiMessageCircle } from 'react-icons/fi';

import SidebarItem from './SidebarItem';
import LogoutIconButton from './LogoutIconButton';
import UserAvatar from './UserAvatar';

const routes = [
	{ icon: FiMessageCircle, pathname: '/chats' },
	{ icon: FiUsers, pathname: '/friends' },
];

const Sidebar = () => {
	const pathname = usePathname();
	const { data } = useSession();

	return (
		<div className='grid grid-rows-[1fr_auto] content-start justify-items-center gap-4 bg-indigo-50/40 p-4'>
			<div className='space-y-4'>
				{routes.map((route, i) => (
					<SidebarItem
						key={i}
						href={route.pathname}
						icon={route.icon}
						isActive={pathname === route.pathname}
					/>
				))}
			</div>
			<div className='space-y-4'>
				<LogoutIconButton onClick={() => signOut()} />
				<UserAvatar
					email={data?.user?.email}
					name={data?.user?.name}
					imageUrl={data?.user?.image}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
