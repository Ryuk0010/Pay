"use client"

import { Button } from "@repo/ui/button"
import { Select } from "@repo/ui/Select"
import { TextInput } from "@repo/ui/TextInput"
import { Card } from "@repo/ui/card"
import { useState } from "react"




const SUPPORTED_BANKS = [{
    name: "CSEC Electric",
    redirectUrl: "https://cselectric.co.in/"
}, {
    name: "WBSEDCL",
    redirectUrl: "https://portal.wbsedcl.in/onlinepay/OnlineBillPay.jsp"
},{
    name: "India Power",
    redirectUrl: "https://mycare.indiapower.com/#/quickpay"
}];

export const Electricity = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setamount] = useState(0);
    const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
    return <Card title="Electricity Suppliers">
        <div>
            <TextInput label="Phone Number/Customer Id" placeholder="Enter your Mobile Number" onChange={(value)=>{
                setamount(Number(value))
            }}></TextInput>
            <div>
                Electricity Suppliers
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
                    Pay
                </Button>
            </div>
        </div>
    </Card>
}