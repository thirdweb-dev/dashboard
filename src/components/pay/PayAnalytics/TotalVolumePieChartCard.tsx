/* eslint-disable react/forbid-dom-props */
import { Pie, PieChart, Cell } from "recharts";
import { cn } from "@/lib/utils";

type VolData = {
  name: string;
  amount: number;
  colorHue: number;
};

// TODO: Replace this with actual data
const volumeData: VolData[] = [
  {
    name: "Buy With Crypto",
    amount: 450,
    colorHue: 241,
  },
  {
    name: "Buy With Fiat",
    amount: 100,
    colorHue: 302,
  },
];

export function TotalVolumePieChartCard() {
  const totalAmount = (550).toLocaleString("en-US");

  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <div className="relative flex justify-center">
        <PieChart width={250} height={250}>
          <defs>
            {volumeData.map((v, i) => (
              <linearGradient
                key={i}
                id={`gradient${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={`hsla(${v.colorHue}, 75%, 55%, 1)`}
                />
                <stop
                  offset="100%"
                  stopColor={`hsla(${v.colorHue}, 75%, 65%, 1)`}
                />
              </linearGradient>
            ))}
          </defs>

          <Pie
            style={{
              outline: "none",
            }}
            activeIndex={0}
            data={volumeData}
            dataKey="amount"
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="100%"
            stroke="none"
            cornerRadius={100}
            paddingAngle={5}
          >
            {volumeData.map((entry, index) => (
              <Cell key={index} fill={`url(#gradient${index})`} />
            ))}
          </Pie>
        </PieChart>

        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="flex flex-col gap-1 items-center">
            <p className="text-sm font-medium"> Total Volume</p>
            <p
              className={cn(
                "text-3xl font-semibold tracking-tighter",
                totalAmount.length > 6 ? "text-3xl" : "text-4xl",
              )}
            >
              ${totalAmount}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-1 border-t border-border pt-5 lg:pt-0 lg:border-none">
        <div className="flex flex-col gap-4">
          {volumeData.map((v, i) => (
            <VolumeLegend
              key={i}
              colorHue={v.colorHue}
              label={v.name}
              amount={v.amount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VolumeLegend(props: {
  colorHue: number;
  label: string;
  amount: number;
}) {
  return (
    <div className="flex items-start gap-2">
      <div
        className="size-5 rounded mt-1"
        style={{
          background: `linear-gradient(45deg, hsla(${props.colorHue}, 75%, 55%, 1), hsla(${props.colorHue}, 75%, 75%, 1))`,
        }}
      />
      <div>
        <p className="text-secondary-foreground font-medium mb-1">
          {props.label}
        </p>
        <p className="text-2xl text-foreground font-semibold tracking-tight">
          ${props.amount.toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
}
