"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import axios from 'axios'; 

export async function CallBankWebHook(tnxId: number){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    if(!userId){
        return{
            message: "You are not Logged in"
        }
    }
    const user = await prisma.onRampTransaction.findFirst({
        where:{
            id: tnxId
        }
    })
    const info = {token: user?.token,
      userId: Number(user?.userId),
      amount: Number(user?.amount),
      status: String(user?.status)}
      console.log(info)
      
    await axios({
        method: 'post',
        url: "http://localhost:3005/bankBackend",
        data: {
          token: user?.token,
          userId: Number(user?.userId),
          amount: Number(user?.amount),
          status: String(user?.status)
        }
      }).then(() => {
        console.log("Send to back webhook");
      }).catch((error: any) => {
        console.error("Error sending webhook:", error);
    });
}

