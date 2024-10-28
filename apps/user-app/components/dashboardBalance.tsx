import { getServerSession } from "next-auth"
import prisma from "@repo/db/client";
import { authOptions } from "../app/lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        throw new Error("User not authenticated");
    }
    const user =  Number(session?.user?.id)
    const balance = await prisma.balance.findFirst({
        
        where: {
            userId: user
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
  }

export const GetdashboardCard = async () => {
    const balance = await getBalance();
    return <div>
        <div>
        <div className="bg-slate-200 w-[35vh] md:w-[50vh] lg:w-[70vh] h-72 mt-28 rounded-xl shadow-xl flex flex-col justify-evenly">
    <div className="px-7 py-4">
        <div className="flex justify-between font-medium text-xl">
            <div>Your Wallet Balance is</div>
            <div>{balance.amount}</div>
        </div>
    </div>
    
    <div className="px-7 py-4">
        <div className="flex justify-between font-medium text-xl">
            <div>Your Account Balance is</div>
            <div>{balance.locked}</div>
        </div>
    </div>

    <div className="px-7 py-4">
        <div className="flex justify-between font-medium text-xl">
            <div>Your Total Balance is</div>
            <div>{balance.amount + balance.locked}</div>
        </div>
    </div>
</div>

            
        </div>
    </div>
}