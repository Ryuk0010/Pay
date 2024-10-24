import { Card } from "@repo/ui/card";

export const P2pTranaction = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    toUser: {
      number: string | undefined;
    };
  }[];
}) => {
  if (!transactions.length) {
    return (
      <div>
        <Card title="Recent Transactions">
          <div className="text-center pb-8 pt-8">No Recent Transactions</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
  <Card title="Recent Transactions">
    <div className="min-w-96 max-h-[500px] overflow-y-auto pt-4">
      {transactions.map((t, index) => (
        <div key={index} className="grid-cols-3 flex items-start py-4">
          <div className="items-start text-left min-w-32">
            <div className="text-sm">Send INR</div>
            <div className="text-slate-600 text-xs">
              {t.time instanceof Date ? t.time.toDateString() : new Date(t.time).toDateString()}
            </div>
          </div>

          <div className="items-start text-left min-w-28">
            <div className="text-sm">Amount</div>
            <div className="text-slate-600 text-xs">Rs {t.amount / 100}</div>
          </div>

          <div className="items-start text-left min-w-28">
            <div className="text-sm">Send To</div>
            <div className="text-slate-600 text-xs">{t.toUser.number || "N/A"}</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
</div>

  );
};
