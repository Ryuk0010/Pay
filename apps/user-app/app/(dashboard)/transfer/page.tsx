
import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard"
import { BalanceCard } from "../../../components/BalanceCard"
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import prisma from "@repo/db/client"
import { redirect } from "next/navigation";
import { Card } from "@repo/ui/card";

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

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns  = await prisma.onRampTransaction.findMany({
      where: {
          userId: Number(session?.user?.id)
      },
      orderBy:{
        id: 'desc'
      }
  });
  return txns.map((t: any) => ({
    time: t.startTime,  
    amount: t.amount,   
    status: t.status,   
    provider: t.provider 
  }));
}

export default async function () {
  const balance = await getBalance();
  // console.log(balance.amount)
  const transactions = await getOnRampTransactions();
  return (
    <div className="flex justify-center ">
      <div className="lg:w-5/6 lg:flex lg:justify-center pt-10 md:flex ">
      <div>
      <div className="pt-4 lg:w-[80vh] lg:h-[40vh] w-96 lg:ml-20">
        <Card title="Note">I have created a backend server to communicate like banking APIs, but since I do not have the access to a banking API, so I have created a API to mimic like a baking API and I am hitting the end point and adding money to the wallet</Card>
      </div>
         <div className="pt-4 lg:w-[80vh] lg:h-[40vh] w-96 lg:ml-20">
        <AddMoney/>
      </div>
     
      </div>
     
      
      <div className="pt-4 lg:w-[80vh] lg:h-[40vh] w-96 lg:ml-20">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        
        <div className="pt-4">
        <OnRampTransactions transactions={transactions} />
        </div>
      </div>
      
    </div>
    </div>
    
  )
}

