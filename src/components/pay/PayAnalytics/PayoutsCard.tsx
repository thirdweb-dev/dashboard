import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { usePayVolume, type PayVolumeData } from "./usePayVolume";
import { useState } from "react";
import { IntervalSelector } from "./IntervalSelector";
import {
  CardHeading,
  ChangeBadge,
  LoadingGraph,
  NoDataAvailable,
  chartHeight,
} from "./common";
import { format } from "date-fns";

type GraphData = {
  date: string;
  value: number;
};

export function PayoutsCard(props: { clientId: string; from: Date; to: Date }) {
  const [intervalType, setIntervalType] = useState<"day" | "week">("day");
  const payoutsQuery = usePayVolume({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    intervalType,
  });

  return (
    <section className="relative flex flex-col justify-center">
      {/* header */}
      <div className="flex justify-between gap-2 items-center mb-1">
        <CardHeading> Payouts </CardHeading>

        {payoutsQuery.data && (
          <IntervalSelector
            intervalType={intervalType}
            setIntervalType={setIntervalType}
          />
        )}
      </div>

      {payoutsQuery.isLoading ? (
        <LoadingGraph className="min-h-[260px]" />
      ) : payoutsQuery.data && payoutsQuery.data.intervalResults.length > 0 ? (
        <RenderData
          data={payoutsQuery.data}
          intervalType={intervalType}
          setIntervalType={setIntervalType}
        />
      ) : (
        <NoDataAvailable />
      )}
    </section>
  );
}

function RenderData(props: {
  data: PayVolumeData;
  intervalType: "day" | "week";
  setIntervalType: (intervalType: "day" | "week") => void;
}) {
  const totalPayoutsUSD = props.data.aggregate.payouts.amountUSDCents / 100;
  const data: GraphData[] = props.data.intervalResults.map((result) => ({
    date: format(new Date(result.interval), "LLL dd"),
    value: result.payouts.amountUSDCents / 100,
  }));

  if (totalPayoutsUSD === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <p className="text-4xl tracking-tighter font-semibold">
          {totalPayoutsUSD.toLocaleString("en-US", {
            currency: "USD",
            style: "currency",
          })}
        </p>
        <ChangeBadge
          percent={props.data.aggregate.payouts.bpsIncreaseFromPriorRange}
        />
      </div>

      <div className="relative flex justify-center w-full">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={data}>
            <Tooltip
              content={(x) => {
                const payload = x.payload?.[0]?.payload as
                  | GraphData
                  | undefined;
                return (
                  <div className="bg-popover px-4 py-2 rounded border border-border">
                    <p className="text-muted-foreground mb-1 text-sm">
                      {payload?.date}
                    </p>
                    <p className="text-medium text-base">
                      {payload?.value.toLocaleString("en-US", {
                        currency: "USD",
                        style: "currency",
                      })}
                    </p>
                  </div>
                );
              }}
              cursor={{ fill: "hsl(var(--accent))", radius: 8 }}
            />
            <Bar
              dataKey="value"
              stroke="none"
              fillOpacity={1}
              fill={"hsl(var(--link-foreground))"}
              radius={8}
              barSize={20}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              className="text-xs font-sans"
              stroke="hsl(var(--muted-foreground))"
              dy={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {props.data && (
        <div className="absolute top-0 right-0">
          <IntervalSelector
            intervalType={props.intervalType}
            setIntervalType={props.setIntervalType}
          />
        </div>
      )}
    </div>
  );
}
