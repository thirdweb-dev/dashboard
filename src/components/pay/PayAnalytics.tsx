import { NewCustomersAreaChart } from "./PayAnalytics/NewCustomersAreaChart";
import { PayoutsBarChart } from "./PayAnalytics/PayoutsBarChart";
import { SuccessRateCard } from "./PayAnalytics/SuccessRateCard";
import { TotalVolumeAreaChartCard } from "./PayAnalytics/TotalVolumeAreaChart";
import { TotalVolumePieChartCard } from "./PayAnalytics/TotalVolumePieChartCard";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";

type PayAnalyticsProps = {
  apiKey: ApiKey;
};

export function PayAnalytics(props: PayAnalyticsProps) {
  const clientId = props.apiKey.key;
  return (
    <div>
      <GridWithSeparator>
        <div className="border-b border-border pb-6 xl:pb-0 xl:border-none">
          <TotalVolumePieChartCard />
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
          <NewCustomersAreaChart clientId={clientId} />
        </div>
      </GridWithSeparator>
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
