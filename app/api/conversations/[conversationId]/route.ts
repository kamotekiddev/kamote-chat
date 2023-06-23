import getCurrentUser from "@/libs/getCurrentUser";
import client from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

interface DeleteParams {
   params: { conversationId?: string };
}

export async function DELETE(request: Request, { params }: DeleteParams) {
   try {
      const { conversationId } = params;
      const currentUser = await getCurrentUser();

      if (!currentUser?.id) {
         return NextResponse.json(null);
      }

      const existingConversation = await client.conversation.findUnique({
         where: {
            id: conversationId,
         },
         include: {
            users: true,
         },
      });

      if (!existingConversation) {
         return new NextResponse("Invalid ID", { status: 400 });
      }

      const deletedConversation = await client.conversation.deleteMany({
         where: {
            id: conversationId,
            userIds: {
               hasSome: [currentUser.id],
            },
         },
      });

      existingConversation.users.forEach((user) => {
         if (user.email) {
            pusherServer.trigger(user.email, "conversation:remove", existingConversation);
         }
      });

      return NextResponse.json(deletedConversation);
   } catch (error) {
      return new NextResponse("Internal server error", { status: 500 });
   }
}
