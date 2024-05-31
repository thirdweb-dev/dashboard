/* eslint-disable react/forbid-dom-props */
import { useId } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type Data = {
  date: string;
  value: number;
};

// TODO: Replace this with actual data
const data: Data[] = [
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

export function PayoutsBarChart() {
  const uniqueId = useId();
  const totalPayouts = 120;
  return (
    <section>
      <h2 className="text-base font-medium mb-2"> Payouts </h2>
      <p className="text-5xl tracking-tighter font-bold">
        ${totalPayouts.toLocaleString("en-US")}
      </p>

      <div className="relative flex justify-center w-full">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} width={400} height={200}>
            <defs>
              <linearGradient id={uniqueId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsla(310, 100%, 55%, 1)" />
                <stop offset="95%" stopColor="hsla(251, 100%, 55%, 0.3)" />
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
              cursor={{ fill: "hsl(var(--accent))", radius: 8 }}
            />
            <Bar
              dataKey="value"
              stroke="none"
              fillOpacity={1}
              fill={`url(#${uniqueId})`}
              radius={8}
              barSize={20}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              className="text-sm font-sans"
              dy={10}
              stroke="hsl(var(--muted-foreground))"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
