import SidebarList from './SidebarList';

const Sidebar = () => {
	return (
		<nav className='grid grid-rows-[1fr_auto] content-start gap-4 bg-indigo-50/40 p-4'>
			<SidebarList />
		</nav>
	);
};

export default Sidebar;
