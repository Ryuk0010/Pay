import express from "express";
import db from "@repo/db/client";
import prisma from "@repo/db/client";
const app = express();

app.use(express.json())

type PaymentInformation = {
    token: string;
    userId: number;
    amount: number;
    status: string;
};

app.post("/hdfcWebhook", async (req, res) => {
    // Assign the received data to `paymentInformation` with proper type annotation
    const paymentInformation: PaymentInformation = {
        token: req.body.token,
        userId: Number(req.body.userId),  // Ensuring it's a number
        amount: Number(req.body.amount),  // Ensuring it's a number
        status: String(req.body.status)   // Ensuring it's a string
    };
    if(paymentInformation.status == "Success"){
        res.status(411).json({
            Message: "This req has been computed already" 
        })
    }
    console.log("Received payment information:", paymentInformation);
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: String(paymentInformation.token)
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        const upbal = await prisma.balance.findFirst({
            where:{
                userId: Number(paymentInformation.userId)
            }
        })
        console.log("updated bal",upbal?.amount);
        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})


app.listen(3003);
