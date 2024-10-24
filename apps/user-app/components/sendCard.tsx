"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTranaction";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <div className="h-full w-full flex justify-center items-center">
                <Card title="Send">
                    <div className="min-w-96 pt-2">
                        <div className="pt-4">
                        <TextInput 
                            placeholder={"Number"} label="Number" onChange={(value) => {
                                setNumber(value);
                            }} 
                        />
                        </div>
                        <div className="pt-4">
                        <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                                setAmount(value);
                            }} 
                        />
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Button onClick={async () => {
                                const user = await p2pTransfer(number, Number(amount) * 100)
                                if(user.message == "Money Send Successfully") alert("Tranaction Complete")
                                    else alert("Tranaction Failed")
                            }}>Send</Button>
                        </div>
                    </div>
                </Card>
        </div>
    );
    
}