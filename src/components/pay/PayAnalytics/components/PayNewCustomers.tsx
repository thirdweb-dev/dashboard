import { useId, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { usePayNewCustomers } from "../hooks/usePayNewCustomers";
import { IntervalSelector } from "./IntervalSelector";
import {
  CardHeading,
  ChangeBadge,
  NoDataAvailable,
  chartHeight,
} from "./common";
import { format } from "date-fns";
import { SkeletonContainer } from "../../../../@/components/ui/skeleton";
import { AreaChartLoadingState } from "../../../analytics/area-chart";

type GraphDataItem = {
  date: string;
  value: number;
};

type UIData = {
  graphData: GraphDataItem[];
  totalNewCustomers: number;
  percentChange: number;
};

export function PayNewCustomers(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const [intervalType, setIntervalType] = useState<"day" | "week">("day");
  const newCustomersQuery = usePayNewCustomers({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    intervalType,
  });

  function getUIData(): {
    data?: UIData;
    isError?: boolean;
    isLoading?: boolean;
  } {
    if (newCustomersQuery.isLoading) {
      return { isLoading: true };
    }

    if (newCustomersQuery.isError) {
      return { isError: true };
    }

    if (newCustomersQuery.data.intervalResults.length === 0) {
      return { isError: true };
    }

    const newCusomtersData: GraphDataItem[] =
      newCustomersQuery.data.intervalResults.map((x) => {
        return {
          date: format(new Date(x.interval), "LLL dd"),
          value: x.distinctCustomers,
        };
      });

    const totalNewCustomers =
      newCustomersQuery.data.aggregate.distinctCustomers;

    return {
      data: {
        graphData: newCusomtersData,
        totalNewCustomers,
        percentChange:
          newCustomersQuery.data.aggregate.bpsIncreaseFromPriorRange / 100,
      },
    };
  }

  const uiData = getUIData();

  return (
    <section className="relative flex flex-col min-h-[320px]">
      {/* header */}
      <div className="flex justify-between gap-2 items-center mb-1">
        <CardHeading>New Customers </CardHeading>

        {uiData.data && (
          <IntervalSelector
            intervalType={intervalType}
            setIntervalType={setIntervalType}
          />
        )}
      </div>

      {/* Chart */}
      {!uiData.isError ? (
        <RenderData
          data={uiData.data}
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
  data?: UIData;
  intervalType: "day" | "week";
  setIntervalType: (intervalType: "day" | "week") => void;
}) {
  const uniqueId = useId();

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <SkeletonContainer
          loadedData={props.data?.totalNewCustomers}
          skeletonData={100}
          render={(v) => {
            return (
              <p className="text-4xl tracking-tighter font-semibold">{v}</p>
            );
          }}
        />

        <SkeletonContainer
          loadedData={props.data?.percentChange}
          className="rounded-2xl"
          skeletonData={1}
          render={(v) => {
            return <ChangeBadge percent={v} />;
          }}
        />
      </div>

      <div className="relative flex justify-center w-full ">
        {props.data?.graphData ? (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={props.data.graphData}>
              <defs>
                <linearGradient id={uniqueId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={"hsl(var(--link-foreground))"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={"hsl(var(--link-foreground))"}
                    stopOpacity={0.0}
                  />
                </linearGradient>
              </defs>

              <Tooltip
                content={(x) => {
                  const payload = x.payload?.[0]?.payload as
                    | GraphDataItem
                    | undefined;
                  return (
                    <div className="bg-popover px-4 py-2 rounded border border-border">
                      <p className="text-muted-foreground mb-1 text-sm">
                        {payload?.date}
                      </p>
                      <p className="text-medium text-base">
                        Customers: {payload?.value}
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={`hsl(var(--link-foreground))`}
                fillOpacity={1}
                fill={`url(#${uniqueId})`}
                strokeWidth={2}
                strokeLinecap="round"
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className="text-xs font-sans mt-5"
                stroke="hsl(var(--muted-foreground))"
                dy={12}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <AreaChartLoadingState height={`${chartHeight}px`} />
        )}
      </div>
    </div>
  );
}
