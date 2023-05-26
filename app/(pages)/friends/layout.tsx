import Sidebar from '@/app/components/Sidebar';

interface Props {
	children: React.ReactNode;
}
const ChatLayout = ({ children }: Props) => {
	return (
		<main className='grid h-screen grid-cols-[70px_auto]'>
			{/* @ts-expect-error Async Server Component */}
			<Sidebar />
			{children}
		</main>
	);
};

export default ChatLayout;
