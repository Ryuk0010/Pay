import { getServerSession } from "next-auth";
import { P2pTranaction } from "../../../components/P2pTranactionsCard";
import { SendCard } from "../../../components/sendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";

async function getUser(userId: number) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
        redirect('/mainpage')
    }
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });
    return {
        number: user?.number,
    };
}

async function getP2pTnx() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) return [];

    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session.user.id),
        },
    });

    // Resolve all promises in parallel using Promise.all
    const transactions = await Promise.all(
        txns.map(async (t) => ({
            time: t.timestamp,
            amount: t.amount,
            toUser: await getUser(t.toUserId),
        }))
    );

    return transactions;
}

export default async function () {
    const transaction = await getP2pTnx();

    return (
        <div className="lg:flex pt-10 lg:w-5/6">
            <div className="mb-10 flex justify-center lg:ml-40">
                <SendCard />
            </div>
            <div className="mt-10 flex justify-center lg:ml-64">
                <P2pTranaction transactions={transaction} />
            </div>
            
        </div>
    );
}
