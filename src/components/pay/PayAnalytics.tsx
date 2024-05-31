import { PayoutsBarChart } from "./PayAnalytics/PayoutsBarChart";
import { TotalVolumeAreaChartCard } from "./PayAnalytics/TotalVolumeAreaChart";
import { TotalVolumePieChartCard } from "./PayAnalytics/TotalVolumePieChartCard";

export function PayAnalytics() {
  return (
    <div>
      {/* Total Volume */}
      <div className="p-4 xl:p-6 relative border border-border grid gap-12 grid-cols-1 xl:grid-cols-2 rounded-lg items-center">
        <div className="border-b border-border pb-6 xl:pb-0 xl:border-none">
          <TotalVolumePieChartCard />
        </div>
        <TotalVolumeAreaChartCard />
        {/* Desktop - horizontal middle */}
        <div className="absolute left-[50%] w-[1px] top-6 bottom-6 bg-border hidden xl:block" />
      </div>

      <div className="h-8" />

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 items-center">
        <div className="border border-border rounded-lg p-4 xl:p-6">
          <PayoutsBarChart />
        </div>
      </div>
    </div>
  );
}
