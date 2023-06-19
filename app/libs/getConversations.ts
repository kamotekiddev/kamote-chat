import getCurrentUser from "./getCurrentUser";
import client from "./prismadb";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  try {
    const conversations = await client.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      where: { userIds: { has: currentUser?.id } },
      include: {
        users: true,
        messages: { include: { sender: true, seenByUsers: true } },
      },
    });

    return conversations;
  } catch (error) {
    console.log("Internal server error", error);
  }
};

export default getConversations;
