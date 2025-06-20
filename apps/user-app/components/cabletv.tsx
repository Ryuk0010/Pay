"use client"

import { Button } from "@repo/ui/button"
import { Select } from "@repo/ui/Select"
import { TextInput } from "@repo/ui/TextInput"
import { Card } from "@repo/ui/card"
import { useState } from "react"



const SUPPORTED_BANKS = [{
    name: "TATA Play DTH",
    redirectUrl: "https://www.tataplayrecharge.com/Recharge/QuickRecharge"
}, {
    name: "Airtel Digital TV",
    redirectUrl: "https://www.airtel.in/dth-recharge?icid=header"
},{
    name: "D2H",
    redirectUrl: "https://www.d2h.com/quick-recharge"
},{
    name: "Sun Direct",
    redirectUrl: "https://www.sundirect.in/quick-recharge"
}];

export const DTH = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setamount] = useState(0);
    const [provider, setprovider] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
    return <Card title="DTH Suppliers">
        <div>
            <TextInput label="Phone Number" placeholder="Enter your Mobile Number" onChange={(value)=>{
                setamount(Number(value))
            }}></TextInput>
            <div>
                DTH Suppliers
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
                <Button onClick={()=> {     
                    window.location.href = redirectUrl || "";
                }}>
                    Recharge
                </Button>
            </div>
        </div>

    </Card>
}