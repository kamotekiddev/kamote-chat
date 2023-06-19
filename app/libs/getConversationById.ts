import client from "./prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;

    const conversation = await client.conversation.findUnique({
      where: { id },
      include: { users: true },
    });
    return conversation;
  } catch (error) {
    return null;
  }
};
export default getConversationById;
