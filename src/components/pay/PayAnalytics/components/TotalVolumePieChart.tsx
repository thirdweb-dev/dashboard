/* eslint-disable react/forbid-dom-props */
import { Pie, PieChart, Cell } from "recharts";
import { cn } from "@/lib/utils";
import { usePayVolume } from "../hooks/usePayVolume";
import { NoDataAvailable, chartHeight } from "./common";
import { useQuery } from "@tanstack/react-query";
import { SkeletonContainer } from "../../../../@/components/ui/skeleton";

type VolData = {
  name: string;
  amount: number;
  color: string;
};

type UIQueryData = {
  totalAmount: number;
  cryptoTotalUSD: number;
  fiatTotalUSD: number;
};

export function TotalVolumePieChart(props: {
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

  const uiQuery = useQuery({
    queryKey: ["TotalVolumePieChartCard", volumeQuery.data],
    queryFn: async () => {
      if (!volumeQuery.data) {
        throw new Error("No volumeQuery available");
      }

      if (volumeQuery.data.aggregate.sum.succeeded.amountUSDCents === 0) {
        throw new Error("Not enough data available");
      }

      const cryptoTotalUSD = Math.ceil(
        volumeQuery.data.aggregate.buyWithCrypto.succeeded.amountUSDCents / 100,
      );
      const fiatTotalUSD = Math.ceil(
        volumeQuery.data.aggregate.buyWithFiat.succeeded.amountUSDCents / 100,
      );

      const totalAmount = cryptoTotalUSD + fiatTotalUSD;

      const data: UIQueryData = {
        totalAmount,
        cryptoTotalUSD,
        fiatTotalUSD,
      };

      return data;
    },
    retry: false,
    enabled: !!volumeQuery.data,
  });

  return (
    <section className="w-full">
      {!uiQuery.isError ? (
        <RenderData data={uiQuery.data} />
      ) : (
        <NoDataAvailable />
      )}
    </section>
  );
}

function RenderData(props: { data?: UIQueryData }) {
  const queryData = props.data;

  const skeletonData: VolData[] = [
    {
      name: "Crypto",
      amount: 50,
      color: "hsl(var(--muted))",
    },
    {
      name: "Fiat",
      amount: 50,
      color: "hsl(var(--muted))",
    },
  ];

  const volumeData: VolData[] = queryData
    ? [
        {
          name: "Crypto",
          amount: queryData.cryptoTotalUSD,
          color: "hsl(var(--link-foreground))",
        },
        {
          name: "Fiat",
          amount: queryData.fiatTotalUSD,
          color: "hsl(var(--foreground))",
        },
      ]
    : skeletonData;

  const skeletonTotalAmount = skeletonData.reduce(
    (acc, x) => acc + x.amount,
    0,
  );

  const totalAmount = (
    queryData?.totalAmount || skeletonTotalAmount
  ).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center">
      {/* Left */}
      <div className="relative flex justify-center">
        <PieChart width={250} height={chartHeight}>
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

            <SkeletonContainer isLoading={!queryData}>
              <p
                className={cn(
                  "text-3xl font-semibold tracking-tighter",
                  totalAmount.length > 6 ? "text-3xl" : "text-4xl",
                )}
              >
                {totalAmount}
              </p>
            </SkeletonContainer>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center border-t border-border pt-5 lg:pt-0 lg:border-none pr-10">
        <div className="flex flex-col gap-4">
          {volumeData.map((v, i) => (
            <VolumeLegend
              key={i}
              color={v.color}
              label={v.name}
              amount={v.amount}
              isSkeleton={!queryData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VolumeLegend(props: {
  color: string;
  label: string;
  amount: number;
  isSkeleton: boolean;
}) {
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

        <SkeletonContainer isLoading={props.isSkeleton}>
          <p className="text-2xl text-foreground font-semibold tracking-tight">
            {props.amount.toLocaleString("en-US", {
              currency: "USD",
              style: "currency",
            })}
          </p>
        </SkeletonContainer>
      </div>
    </div>
  );
}
