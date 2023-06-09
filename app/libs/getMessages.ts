import client from './prismadb';

const getMessages = async (conversationId: string) => {
	try {
		const messages = await client.message.findMany({
			where: { conversationId },
			include: {
				seenByUsers: true,
				sender: true,
			},
			orderBy: { createdAt: 'asc' },
		});
		return messages;
	} catch (error) {
		return [];
	}
};

export default getMessages;
