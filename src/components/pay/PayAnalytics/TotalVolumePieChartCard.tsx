/* eslint-disable react/forbid-dom-props */
import { Pie, PieChart, Cell } from "recharts";
import { cn } from "@/lib/utils";
import { usePayVolume } from "./usePayVolume";
import { LoadingGraph, NoDataAvailable } from "./common";

type VolData = {
  name: string;
  amount: number;
  color: string;
};

export function TotalVolumePieChartCard(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const volumeQuery = usePayVolume({
    clientId: props.clientId,
    from: props.from,
    intervalType: "day",
    to: props.to,
  });

  if (volumeQuery.isLoading) {
    return <LoadingGraph />;
  }

  if (!volumeQuery.data) {
    return <NoDataAvailable />;
  }

  const cryptoTotalUSD = Math.ceil(
    volumeQuery.data.aggregate.buyWithCrypto.succeeded.amountUSDCents / 100,
  );
  const fiatTotalUSD = Math.ceil(
    volumeQuery.data.aggregate.buyWithFiat.succeeded.amountUSDCents / 100,
  );

  const totalAmount = cryptoTotalUSD + fiatTotalUSD;

  const volumeData: VolData[] = [
    {
      name: "Buy With Crypto",
      amount: cryptoTotalUSD,
      color: "hsl(var(--link-foreground))",
    },
    {
      name: "Buy With Fiat",
      amount: fiatTotalUSD,
      color: "hsl(var(--foreground))",
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <div className="relative flex justify-center">
        <PieChart width={250} height={250}>
          <Pie
            style={{
              outline: "none",
            }}
            activeIndex={0}
            data={volumeData}
            dataKey="amount"
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="100%"
            stroke="none"
            cornerRadius={100}
            paddingAngle={5}
          >
            {volumeData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="flex flex-col gap-1 items-center">
            <p className="text-sm font-medium"> Total Volume</p>
            <p
              className={cn(
                "text-3xl font-semibold tracking-tighter",
                `${totalAmount}`.length > 6 ? "text-3xl" : "text-4xl",
              )}
            >
              ${totalAmount.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-1 border-t border-border pt-5 lg:pt-0 lg:border-none">
        <div className="flex flex-col gap-4">
          {volumeData.map((v, i) => (
            <VolumeLegend
              key={i}
              color={v.color}
              label={v.name}
              amount={v.amount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VolumeLegend(props: { color: string; label: string; amount: number }) {
  return (
    <div className="flex items-start gap-2">
      <div
        className="size-5 rounded mt-1"
        style={{
          background: props.color,
        }}
      />
      <div>
        <p className="text-secondary-foreground font-medium mb-1">
          {props.label}
        </p>
        <p className="text-2xl text-foreground font-semibold tracking-tight">
          ${props.amount.toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
}
