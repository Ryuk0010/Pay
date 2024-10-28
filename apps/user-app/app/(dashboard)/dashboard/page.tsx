import { getServerSession } from "next-auth";
import { HelloCard } from "../../../components/HelloCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { GetdashboardCard } from "../../../components/dashboardBalance";
import { DebitAndCrredit } from "../../../components/debitAndCredit";
import { redirect } from "next/navigation";

async function getBalance() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        redirect('/mainpage')
    }
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
  }

export default async function () {
    const balance = await getBalance();
    const date = new Date();
    const hours = date.getHours();
    const greeting = (hours < 12)? ", Good Morning" : ", Good Evening";
    return <div>
        <div className="max-md:justify-center">
            <div className="flex max-md:justify-center font-extrabold text-3xl text-purple-800 pt-4 pl-4">
            <HelloCard/> {greeting}
            </div>
            <div className="lg:flex justify-around lg:ml-14">
                <div className="flex justify-center">
                    <GetdashboardCard/>
                </div>
                <div className="flex justify-center lg:ml-44">
                    <DebitAndCrredit/>
                </div>
            </div>
        </div>
    </div>
}