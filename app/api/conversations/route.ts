import { NextResponse } from "next/server";
import client from "@/libs/prismadb";
import getCurrentUser from "@/libs/getCurrentUser";
import { pusherServer } from "@/libs/pusher";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    const currentuser = await getCurrentUser();
    if (!currentuser?.id || !currentuser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    if (isGroup && (!members || members?.length < 2 || !name))
      return new NextResponse("Invalid data", { status: 400 });

    if (isGroup) {
      const newConversation = await client.conversation.create({
        data: {
          name,
          isGroup,
          userIds: [
            currentuser?.id,
            ...members?.map((member: string) => member),
          ],
          users: {
            connect: [
              { id: currentuser?.id },
              ...members.map((member: string) => ({ id: member })),
            ],
          },
        },
        include: { users: true },
      });

      newConversation.users.forEach((user) => {
        if (user.email)
          pusherServer.trigger(user.email, "conversation:new", newConversation);
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await client.conversation.findMany({
      where: {
        OR: [{ userIds: { equals: [currentuser?.id, userId] } }],
      },
    });

    if (existingConversations.length > 0)
      return NextResponse.json(existingConversations[0]);

    const newConversation = await client.conversation.create({
      data: {
        userIds: [currentuser?.id, userId],
        users: { connect: [{ id: currentuser?.id }, { id: userId }] },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.forEach((user) => {
      if (user.email)
        pusherServer.trigger(user.email, "conversation:new", newConversation);
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
