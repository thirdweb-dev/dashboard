/* eslint-disable react/forbid-dom-props */
import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type VolData = {
  date: string;
  value: number;
};

// TODO: Replace this with actual data
const volumeData: VolData[] = [
  {
    date: "Mon",
    value: 100,
  },
  {
    date: "Tue",
    value: 120,
  },
  {
    date: "Wed",
    value: 140,
  },
  {
    date: "Thu",
    value: 210,
  },
  {
    date: "Fri",
    value: 100,
  },
  {
    date: "Sat",
    value: 150,
  },
  {
    date: "Sun",
    value: 400,
  },
];

export function TotalVolumeAreaChartCard() {
  const uniqueId = useId();
  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <div className="relative flex justify-center w-full">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={volumeData} width={400} height={250}>
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
                return (
                  <div className="bg-popover px-4 py-2 rounded border border-border">
                    <p className="text-muted-foreground mb-1 text-sm">
                      {x.payload?.[0]?.payload.date}
                    </p>
                    <p className="text-medium text-base">
                      ${x.payload?.[0]?.value}
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
              className="text-sm font-sans"
              stroke="hsl(var(--muted-foreground))"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
