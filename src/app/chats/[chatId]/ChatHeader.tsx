interface Props {
	children: React.ReactNode;
}
const ChatHeader = ({ children }: Props) => {
	return (
		<header>
			<h1 className='prose-lg font-bold'>{children}</h1>
		</header>
	);
};

export default ChatHeader;
