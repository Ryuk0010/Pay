"use client"

import { Button } from "@repo/ui/button"
import { Select } from "@repo/ui/Select"
import { TextInput } from "@repo/ui/TextInput"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { createOnRampTnx } from "../app/lib/actions/createOnRamptnx"
import axios from "axios"
import { CallBankWebHook } from "../app/lib/actions/callBankWebHook"



const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setamount] = useState(0);
    const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
    return <Card title="AddMoney">
        <div>
            <TextInput label="Amount" placeholder="Enter your Amount" onChange={(value)=>{
                setamount(Number(value))
            }}></TextInput>
            <div>
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                setprovider(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")

            }} options={SUPPORTED_BANKS.map(x =>({
                key: x.name,
                value: x.name
            }))}>

            </Select>
            <div className="pt-4 flex justify-center">
                <Button onClick={async() => {
                    const user = await createOnRampTnx(amount*100, provider)
                    await CallBankWebHook(Number(user.tnxId?.id));
                      
                    window.location.href = redirectUrl || "";
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}