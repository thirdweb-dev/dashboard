import { useState } from "react";
import { DatePickerWithRange } from "../../@/components/ui/DatePickerWithRange";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../@/components/ui/select";
import { NewCustomersAreaChart } from "./PayAnalytics/NewCustomersAreaChart";
import { PayoutsBarChart } from "./PayAnalytics/PayoutsBarChart";
import { SuccessRateCard } from "./PayAnalytics/SuccessRateCard";
import { TotalVolumeAreaChartCard } from "./PayAnalytics/TotalVolumeAreaChart";
import { TotalVolumePieChartCard } from "./PayAnalytics/TotalVolumePieChartCard";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";

type PayAnalyticsProps = {
  apiKey: ApiKey;
};

type Range = {
  type: "last-week" | "last-month" | "last-year" | "custom";
  from: Date;
  to: Date;
};

export function PayAnalytics(props: PayAnalyticsProps) {
  const clientId = props.apiKey.key;
  const [range, setRange] = useState<Range>(() => getLastYearRange());

  return (
    <div>
      <div className="flex">
        <Filters range={range} setRange={setRange} />
      </div>

      <div className="h-6" />

      <GridWithSeparator>
        <div className="border-b border-border pb-6 xl:pb-0 xl:border-none">
          <TotalVolumePieChartCard
            clientId={clientId}
            from={range.from}
            to={range.to}
          />
        </div>
        <TotalVolumeAreaChartCard />
      </GridWithSeparator>

      <div className="h-8" />

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <div className="border border-border rounded-lg p-4 xl:p-6">
          <PayoutsBarChart />
        </div>
        <div className="border border-border rounded-lg p-4 xl:p-6 flex items-center">
          <SuccessRateCard />
        </div>
      </div>

      <div className="h-8" />

      <GridWithSeparator>
        <div className="border-b border-border pb-6 xl:pb-0 xl:border-none">
          <NewCustomersAreaChart
            clientId={clientId}
            from={range.from}
            to={range.to}
          />
        </div>
      </GridWithSeparator>
    </div>
  );
}

function getLastWeekRange() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const value: Range = {
    type: "last-week",
    from: lastWeek,
    to: today,
  };

  return value;
}

function getLastMonthRange() {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const value: Range = {
    type: "last-month",
    from: lastMonth,
    to: today,
  };

  return value;
}

function getLastYearRange() {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const value: Range = {
    type: "last-year",
    from: lastYear,
    to: today,
  };

  return value;
}

function Filters(props: { range: Range; setRange: (range: Range) => void }) {
  const { range, setRange } = props;

  const presets = (
    <div className="p-4 border-t border-border mt-2">
      <Select
        value={range.type}
        onValueChange={(value: string) => {
          if (value === "last-week") {
            setRange(getLastWeekRange());
          } else if (value === "last-month") {
            setRange(getLastMonthRange());
          } else if (value === "last-year") {
            setRange(getLastYearRange());
          }
        }}
      >
        <SelectTrigger className="bg-transparent flex">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="last-week">Last Week </SelectItem>
          <SelectItem value="last-month">Last Month</SelectItem>
          <SelectItem value="last-year">Last Year</SelectItem>

          {range.type === "custom" && (
            <SelectItem value="custom">Custom</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex gap-2">
      <DatePickerWithRange
        range={{
          from: range.from,
          to: range.to,
        }}
        setRange={(r) =>
          setRange({
            from: r.from,
            to: r.to,
            type: "custom",
          })
        }
        footer={presets}
        labelOverride={
          range.type === "last-week"
            ? "Last Week"
            : range.type === "last-month"
              ? "Last Month"
              : range.type === "last-year"
                ? "Last Year"
                : undefined
        }
      />
    </div>
  );
}

function GridWithSeparator(props: { children: React.ReactNode }) {
  return (
    <div className="p-4 xl:p-6 relative border border-border grid gap-12 grid-cols-1 xl:grid-cols-2 rounded-lg">
      {props.children}
      {/* Desktop - horizontal middle */}
      <div className="absolute left-[50%] w-[1px] top-6 bottom-6 bg-border hidden xl:block" />
    </div>
  );
}
