/* eslint-disable react/forbid-dom-props */
import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  usePayNewCustomers,
  type PayNewCustomersData,
} from "./usePayNewUsersAnalytics";
import { Spinner } from "../../../@/components/ui/Spinner/Spinner";
import { Badge } from "../../../@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type GraphData = {
  date: string;
  value: number;
};

export function NewCustomersAreaChart(props: { clientId: string }) {
  const newCustomersQuery = usePayNewCustomers(props.clientId);

  return (
    <section>
      <h2 className="text-base font-medium mb-2"> New Customers </h2>
      {newCustomersQuery.isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <Spinner className="size-10" />
        </div>
      ) : newCustomersQuery.data &&
        newCustomersQuery.data.intervalResults.length > 0 ? (
        <RenderData data={newCustomersQuery.data} />
      ) : (
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      )}
    </section>
  );
}

function RenderData(props: { data: PayNewCustomersData }) {
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
                  stopColor={"hsl(var(--primary-foreground))"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={"hsl(var(--primary-foreground))"}
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
              stroke={`hsl(var(--primary-foreground))`}
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
    </div>
  );
}
