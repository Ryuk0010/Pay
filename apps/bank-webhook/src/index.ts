import express from "express";
import db from "@repo/db/client";
import prisma from "@repo/db/client";
const app = express();

app.use(express.json())


app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
        status: string
    } = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
        status: req.body.status
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
                    token: paymentInformation.token
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
