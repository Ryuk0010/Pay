import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number,
    locked: number,
}) => {
    return <Card title="Balance">
        <div>
            <div className="flex justify-between">
                Wallet Balance
            </div>
            <div>
                {amount / 100} INR
            </div>

            <div className="flex justify-between">
                Account Balance
            </div>
            <div>
                {locked / 100} INR
            </div>

            <div className="flex justify-between">
                Total Balance
            </div>
            <div>
                {locked + amount/ 100} INR
            </div>
        </div>
    </Card>
}