import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { usePayVolume } from "../hooks/usePayVolume";
import { useState } from "react";
import { IntervalSelector } from "./IntervalSelector";
import {
  CardHeading,
  ChangeBadge,
  NoDataAvailable,
  chartHeight,
} from "./common";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { SkeletonContainer } from "../../../../@/components/ui/skeleton";
import { AreaChartLoadingState } from "../../../analytics/area-chart";

type GraphData = {
  date: string;
  value: number;
};

type UIQueryData = {
  totalPayoutsUSD: number;
  graphData: GraphData[];
  percentChange: number;
};

export function Payouts(props: { clientId: string; from: Date; to: Date }) {
  const [intervalType, setIntervalType] = useState<"day" | "week">("day");
  const payoutsQuery = usePayVolume({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    intervalType,
  });

  const uiQuery = useQuery<UIQueryData>({
    queryKey: ["Payouts", payoutsQuery.data],
    enabled: !!payoutsQuery.data,
    retry: payoutsQuery.isError || false,
    queryFn: async () => {
      if (!payoutsQuery.data) {
        throw new Error("Unexpected");
      }

      if (payoutsQuery.data.intervalResults.length === 0) {
        throw new Error("No data available");
      }

      const totalPayoutsUSD =
        payoutsQuery.data.aggregate.payouts.amountUSDCents / 100;

      const graphData: GraphData[] = payoutsQuery.data.intervalResults.map(
        (result) => ({
          date: format(new Date(result.interval), "LLL dd"),
          value: result.payouts.amountUSDCents / 100,
        }),
      );

      const percentChange =
        payoutsQuery.data.aggregate.payouts.bpsIncreaseFromPriorRange / 100;

      return { totalPayoutsUSD, graphData, percentChange };
    },
  });

  return (
    <section className="relative flex flex-col justify-center">
      {/* header */}
      <div className="flex justify-between gap-2 items-center mb-1">
        <CardHeading> Payouts </CardHeading>

        {uiQuery.data && (
          <IntervalSelector
            intervalType={intervalType}
            setIntervalType={setIntervalType}
          />
        )}
      </div>

      {!uiQuery.isError ? (
        <RenderData
          data={uiQuery.data}
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
  data?: UIQueryData;
  intervalType: "day" | "week";
  setIntervalType: (intervalType: "day" | "week") => void;
}) {
  const percentageChangeSkeleton = 1;
  const totalPayoutsSkeleton = 20;

  const totalPayouts = (
    props.data?.totalPayoutsUSD || totalPayoutsSkeleton
  ).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <SkeletonContainer isLoading={!props.data}>
          <p className="text-4xl tracking-tighter font-semibold">
            {totalPayouts}
          </p>
        </SkeletonContainer>
        <SkeletonContainer isLoading={!props.data}>
          <ChangeBadge
            percent={props.data?.percentChange || percentageChangeSkeleton}
          />
        </SkeletonContainer>
      </div>

      <div className="relative flex justify-center w-full">
        {props.data?.graphData ? (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={props.data.graphData}>
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
        ) : (
          <AreaChartLoadingState height={`${chartHeight}px`} />
        )}
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
