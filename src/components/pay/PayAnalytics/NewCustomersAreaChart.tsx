/* eslint-disable react/forbid-dom-props */
import { useId, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  usePayNewCustomers,
  type PayNewCustomersData,
} from "./usePayNewCustomers";
import { Badge } from "../../../@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { IntervalSelector } from "./IntervalSelector";
import { LoadingGraph, NoDataAvailable } from "./common";

type GraphData = {
  date: string;
  value: number;
};

export function NewCustomersAreaChart(props: {
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

  return (
    <section className="relative">
      <h2 className="text-base font-medium mb-2"> New Customers </h2>
      {newCustomersQuery.isLoading ? (
        <LoadingGraph />
      ) : newCustomersQuery.data &&
        newCustomersQuery.data.intervalResults.length > 0 ? (
        <RenderData
          data={newCustomersQuery.data}
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
  data: PayNewCustomersData;
  intervalType: "day" | "week";
  setIntervalType: (intervalType: "day" | "week") => void;
}) {
  const uniqueId = useId();

  const newCusomtersData: GraphData[] = props.data.intervalResults.map((x) => {
    return {
      date: new Date(x.interval).toLocaleDateString(),
      value: x.distinctCustomers,
    };
  });

  const totalNewCustomers = props.data.aggregate.distinctCustomers;

  const percentChangeSinceLastInterval =
    props.data.aggregate.bpsIncreaseFromPriorRange * 100;

  if (totalNewCustomers === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <p className="text-5xl tracking-tighter font-bold">
          {totalNewCustomers}
        </p>
        <Badge
          variant={
            percentChangeSinceLastInterval >= 0 ? "success" : "destructive"
          }
          className="text-lg gap-1"
        >
          {percentChangeSinceLastInterval >= 0 ? (
            <ArrowUpIcon className="size-4 " />
          ) : (
            <ArrowDownIcon className="size-4" />
          )}
          {percentChangeSinceLastInterval.toFixed(1)}%
        </Badge>
      </div>

      <div className="relative flex justify-center w-full ">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={newCusomtersData} width={400} height={250}>
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
                  | GraphData
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
              interval="preserveStartEnd"
              className="text-sm font-sans mt-5"
              stroke="hsl(var(--muted-foreground))"
              tickMargin={12}
            />
          </AreaChart>
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
