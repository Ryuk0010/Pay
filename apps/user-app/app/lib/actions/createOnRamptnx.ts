"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function   createOnRampTnx(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString(); //comes from bank
    const userId = session.user.id;
    let newtnxId;
    if(!userId){
        return{
            message: "You are not Logged in"
        }
    }
    try {
        const newtnx = await prisma.onRampTransaction.create({
            data:{
                userId: Number(userId),
                amount: amount,
                status: "Processing",
                startTime: new Date(),
                provider: provider,
                token: token
            }
            
        })
        
        newtnxId = newtnx;
        
    

    } catch (error) {
        console.log("crror in cfeateonranptnx", error)
    }
    return {
        tnxId: newtnxId,
        message: "OnRamp Tranaction Added"
    }
}