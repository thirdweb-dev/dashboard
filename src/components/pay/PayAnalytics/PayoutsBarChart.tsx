/* eslint-disable react/forbid-dom-props */
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { usePayVolume, type PayVolumeData } from "./usePayVolume";
import { useState } from "react";
import { IntervalSelector } from "./IntervalSelector";
import { Spinner } from "@chakra-ui/react";

type GraphData = {
  date: string;
  value: number;
};

export function PayoutsBarChart(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const [intervalType, setIntervalType] = useState<"day" | "week">("day");
  const payoutsQuery = usePayVolume({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    intervalType,
  });

  return (
    <section className="relative">
      <h2 className="text-base font-medium mb-2"> Payouts </h2>

      {payoutsQuery.isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <Spinner className="size-10" />
        </div>
      ) : payoutsQuery.data && payoutsQuery.data.intervalResults.length > 0 ? (
        <RenderData data={payoutsQuery.data} />
      ) : (
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      )}

      {payoutsQuery.data && (
        <div className="absolute top-0 right-0">
          <IntervalSelector
            intervalType={intervalType}
            setIntervalType={setIntervalType}
          />
        </div>
      )}
    </section>
  );
}

function RenderData(props: { data: PayVolumeData }) {
  const totalPayouts = props.data.aggregate.sum.succeeded;
  const data: GraphData[] = props.data.intervalResults.map((result) => ({
    date: new Date(result.interval).toLocaleDateString(),
    value: result.payouts.succeeded,
  }));

  return (
    <div>
      <p className="text-5xl tracking-tighter font-bold">
        {totalPayouts.toLocaleString("en-US")}
      </p>

      <div className="relative flex justify-center w-full">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} width={400} height={200}>
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
                      Payouts: {payload?.value}
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
              interval="preserveStartEnd"
              className="text-sm font-sans"
              dy={10}
              stroke="hsl(var(--muted-foreground))"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
