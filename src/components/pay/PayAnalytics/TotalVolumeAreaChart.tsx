/* eslint-disable react/forbid-dom-props */
import { useId, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { usePayVolume, type PayVolumeData } from "./usePayVolume";
import { CardHeading, LoadingGraph, NoDataAvailable } from "./common";
import { IntervalSelector } from "./IntervalSelector";
import { format } from "date-fns";
import { TabButtons } from "../../../@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type GraphData = {
  date: string;
  value: number;
};

export function TotalVolumeAreaChartCard(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const [intervalType, setIntervalType] = useState<"day" | "week">("day");

  const volumeQuery = usePayVolume({
    clientId: props.clientId,
    from: props.from,
    intervalType,
    to: props.to,
  });

  return (
    <section className="relative">
      <CardHeading> Volume </CardHeading>
      {volumeQuery.isLoading ? (
        <LoadingGraph />
      ) : volumeQuery.data && volumeQuery.data.intervalResults.length > 0 ? (
        <RenderData
          data={volumeQuery.data}
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
  const uniqueId = useId();
  const [activeTab, setActiveTab] = useState<"all" | "crypto" | "fiat">("all");
  const [successType, setSuccessType] = useState<"success" | "fail">("success");

  const data: GraphData[] = props.data.intervalResults.map((x) => {
    const date = format(new Date(x.interval), "LLL dd");

    if (activeTab === "crypto") {
      return {
        date,
        value:
          x.buyWithCrypto[successType === "success" ? "succeeded" : "failed"]
            .amountUSDCents / 100,
      };
    }

    if (activeTab === "fiat") {
      return {
        date,
        value:
          x.buyWithFiat[successType === "success" ? "succeeded" : "failed"]
            .amountUSDCents / 100,
      };
    }

    return {
      date,
      value:
        x.sum[successType === "success" ? "succeeded" : "failed"]
          .amountUSDCents / 100,
    };
  });

  const chartColor =
    successType === "success"
      ? "hsl(var(--success-foreground))"
      : "hsl(var(--destructive-foreground))";

  return (
    <div>
      <div className="h-7 md:h-3" />

      <TabButtons
        tabs={[
          {
            name: "Total",
            isActive: activeTab === "all",
            onClick: () => setActiveTab("all"),
            isEnabled: true,
          },
          {
            name: "Crypto",
            isActive: activeTab === "crypto",
            onClick: () => setActiveTab("crypto"),
            isEnabled: true,
          },
          {
            name: "Fiat",
            isActive: activeTab === "fiat",
            onClick: () => setActiveTab("fiat"),
            isEnabled: true,
          },
        ]}
      />

      <div className="h-1" />

      <div className="flex justify-center w-full">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} width={400} height={250}>
            <defs>
              <linearGradient id={uniqueId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.0} />
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
                      {payload?.value.toLocaleString("en-US", {
                        currency: "USD",
                        style: "currency",
                      })}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fillOpacity={1}
              fill={`url(#${uniqueId})`}
              strokeWidth={2}
              strokeLinecap="round"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              className="text-xs font-sans"
              stroke="hsl(var(--muted-foreground))"
              dy={10}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="absolute top-0 right-0 flex gap-2">
          <Select
            value={successType}
            onValueChange={(value: "success" | "fail") => {
              setSuccessType(value);
            }}
          >
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="success">Successful</SelectItem>
              <SelectItem value="fail">Failed</SelectItem>
            </SelectContent>
          </Select>

          <IntervalSelector
            intervalType={props.intervalType}
            setIntervalType={props.setIntervalType}
          />
        </div>
      </div>
    </div>
  );
}
