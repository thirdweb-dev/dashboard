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
import { format } from "date-fns";

type PayAnalyticsProps = {
  apiKey: ApiKey;
};

type LastX = "last-7" | "last-30" | "last-60" | "last-120";

type Range = {
  type: LastX | "custom";
  label?: string;
  from: Date;
  to: Date;
};

export function PayAnalytics(props: PayAnalyticsProps) {
  const clientId = props.apiKey.key;
  const [range, setRange] = useState<Range>(() =>
    getLastNDaysRange("last-120"),
  );

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
          <PayoutsBarChart
            clientId={clientId}
            from={range.from}
            to={range.to}
          />
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

function getLastNDaysRange(type: LastX) {
  const todayDate = new Date();
  const pastDate = new Date(todayDate);

  let days = 0;
  let label = "";
  if (type === "last-7") {
    days = 7;
    label = "Last 7 Days";
  } else if (type === "last-30") {
    days = 30;
    label = "Last 30 Days";
  } else if (type === "last-60") {
    days = 60;
    label = "Last 60 Days";
  } else if (type === "last-120") {
    days = 120;
    label = "Last 120 Days";
  }

  pastDate.setDate(todayDate.getDate() - days);

  const value: Range = {
    type,
    from: pastDate,
    to: todayDate,
    label,
  };

  return value;
}

function Filters(props: { range: Range; setRange: (range: Range) => void }) {
  const { range, setRange } = props;

  const presets = (
    <div className="p-4 border-b border-border mb-2">
      <Select
        value={range.type}
        onValueChange={(value: LastX) => {
          setRange(getLastNDaysRange(value));
        }}
      >
        <SelectTrigger className="bg-transparent flex">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="last-7">Last 7 Days </SelectItem>
          <SelectItem value="last-30">Last 30 Days </SelectItem>
          <SelectItem value="last-60">Last 60 Days </SelectItem>
          <SelectItem value="last-120">Last 120 Days </SelectItem>

          {range.type === "custom" && (
            <SelectItem value="custom">
              {format(range.from, "LLL dd, y")} -{" "}
              {format(range.to, "LLL dd, y")}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex gap-2">
      <DatePickerWithRange
        from={range.from}
        to={range.to}
        setFrom={(from) =>
          setRange({
            from,
            to: range.to,
            type: "custom",
          })
        }
        setTo={(to) =>
          setRange({
            from: range.from,
            to,
            type: "custom",
          })
        }
        header={presets}
        labelOverride={range.label}
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
