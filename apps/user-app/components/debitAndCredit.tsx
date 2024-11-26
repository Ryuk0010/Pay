import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";

export const DebitAndCrredit = async () => {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!session || !session.user || !session.user.id) {
        redirect('/mainpage')
    }
    
    const debitInfo = await prisma.p2pTransfer.findFirst({
        where: {
            fromUserId: userId,
        },
        orderBy: {
            id: 'desc',
        },
    });

    const creditInfo = await prisma.onRampTransaction.findFirst({
        where: {
            userId: userId,
        },
        orderBy: {
            id: 'desc',
        },
    });

    const debit = Number(debitInfo?.amount) / 100; // Convert to INR
    const credit = Number(creditInfo?.amount) / 100; // Convert to INR

    return (
        <div className="bg-slate-200 w-[35vh] md:w-[50vh] lg:w-[70vh] h-72 mt-28 rounded-xl shadow-xl flex flex-col justify-evenly px-7">
            <div className="flex justify-between font-medium text-xl">
                <div>Your Recent Debit</div>
                <div>{`${debit} INR`}</div>
            </div>
            <div className="flex justify-between font-medium text-xl">
                <div>Your Recent Credit</div>
                <div>{`${credit} INR`}</div>
            </div>
        </div>
    );
};
