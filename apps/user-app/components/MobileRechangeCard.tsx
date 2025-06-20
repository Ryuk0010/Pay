"use client"

import { Button } from "@repo/ui/button"
import { Select } from "@repo/ui/Select"
import { TextInput } from "@repo/ui/TextInput"
import { Card } from "@repo/ui/card"
import { useState } from "react"



const SUPPORTED_BANKS = [{
    name: "VI",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Airtel",
    redirectUrl: "https://www.axisbank.com/"
},{
    name: "Jio",
    redirectUrl: "https://www.axisbank.com/"
}];

export const Mobilerecharge = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setamount] = useState(0);
    const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
    return <Card title="Mobile Recharge">
        <div>
            <TextInput label="Phone Number" placeholder="Enter your Mobile Number" onChange={(value)=>{
                setamount(Number(value))
            }}></TextInput>
            <div>
                Service Provider
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
                <Button onClick={() => {
                      
                    window.location.href = redirectUrl || "";
                }}>
                    Mobile Rechange
                </Button>
            </div>
        </div>
    </Card>
}