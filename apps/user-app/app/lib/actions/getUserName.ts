"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getUserName() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("User is not authenticated or ID is missing.");
    }

    const userId = await prisma.user.findFirst({
        where: {
            id: Number(session.user.id),
        },
    });

    return {
        name: userId?.name, // Fallback to "Guest" if name is not available
    };
}
