import { NextResponse } from "next/server";
import getCurrentUser from "@/libs/getCurrentUser";
import client from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

interface Params {
  params: { conversationId?: string };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { conversationId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const conversation = await client.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: { include: { seenByUsers: true } }, users: true },
    });

    if (!conversation) return new NextResponse("Invalid ID", { status: 400 });
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return NextResponse.json(conversation);

    const updatedMessage = await client.message.update({
      where: { id: lastMessage.id },
      data: { seenByUsers: { connect: { id: currentUser.id } } },
      include: { sender: true, seenByUsers: true },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (lastMessage.seenByIds.includes(currentUser.id))
      return NextResponse.json(conversation);

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
