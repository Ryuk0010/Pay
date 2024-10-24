
import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard"
import { BalanceCard } from "../../../components/BalanceCard"
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import prisma from "@repo/db/client"

async function getBalance() {
  const session = await getServerSession(authOptions);
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

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
      where: {
          userId: Number(session?.user?.id)
      }
  });
  return txns.map(t => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return (
    <div className="w-screen px-4 flex overflow-x-hidden">
      <div className="pt-4 w-full pr-4">
        <AddMoney/>
      </div>
      
      <div className="pt-4 w-full">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <div className="pt-4">
        <OnRampTransactions transactions={transactions} />
        </div>
      </div>
      
    </div>
  )
}

