import { TableToolTip } from "./table-tooltip";
import { Box, BoxProps } from "@chakra-ui/react";
import { useId, useMemo } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type GenericDataType = Record<string, string | number>;

type IndexType = "date";

export interface AutoBarChartProps<
  TData extends GenericDataType,
  TIndexKey extends keyof TData,
> extends BoxProps {
  data: TData[];
  index: {
    id: TIndexKey;
    label?: string;
    type?: IndexType;
    format?: (index: TData[TIndexKey]) => string;
  };
  showXAxis?: boolean;
  showYAxis?: boolean;
  startEndOnly?: boolean;
}

const BAR_COLORS = [
  // brick red
  "#D62728",
  // safety orange
  "#FF7F0E",
  // light yellow
  "#DBDB8D",
  // cooked asparagus green
  "#2CA02C",
  // slime green
  "#BCBD22",
  // muted blue
  "#1F77B4",
  // blue-teal
  "#17BECF",
  // muted purple
  "#9467BD",
  // light pink
  "#F7B6D2",
  // raspberry yogurt pink
  "#E377C2",
  // chestnut brown
  "#8C564B",
  // silver
  "#C7C7C7",
  // middle gray
  "#7F7F7F",
];

export const AutoBarChart = <
  TData extends GenericDataType,
  TIndexKey extends keyof TData,
>({
  data,
  index,
  showXAxis,
  showYAxis,
  startEndOnly,
  ...boxProps
}: AutoBarChartProps<TData, TIndexKey>) => {
  const id = useId();

  const categories = useMemo(() => {
    const autoKeys: string[] = [];
    data.forEach((item) => {
      for (const key of Object.keys(item)) {
        if (key === index.id) {
          continue;
        }

        if (!autoKeys.includes(key)) {
          autoKeys.push(key);
        }
      }
    });

    return autoKeys.map((key, idx) => ({
      id: key,
      label: key,
      color: BAR_COLORS[idx % BAR_COLORS.length],
    }));
  }, [data, index.id]);

  if (!index.type) {
    index.type = "date";
  }

  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => (a[index.id] as number) - (b[index.id] as number),
    );
  }, [data, index]);

  if (!data.length) {
    return null;
  }

  return (
    <Box {...boxProps}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <defs>
            {categories.map((cat) => (
              <linearGradient
                key={`${cat.id as string}`}
                id={`bar_color_${id}_${cat.id as string}`}
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0"
                  stopColor={cat.color || "#3385FF"}
                  stopOpacity={1}
                />
                <stop
                  offset="1"
                  stopColor={cat.color || "#3385FF"}
                  stopOpacity={0.75}
                />
              </linearGradient>
            ))}
          </defs>

          {categories.map((cat) => (
            <Bar
              key={`${cat.id as string}`}
              dataKey={cat.id as string}
              stackId="a"
              stroke={cat.color || "#3385FF"}
              fill={`url(#bar_color_${id}_${cat.id as string})`}
              strokeWidth={0}
            />
          ))}
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={({ active, payload }) => {
              if (!active || !payload) {
                return null;
              }

              const { time, ...values } = payload[0].payload;

              return (
                <TableToolTip
                  time={payload[0]?.payload?.time}
                  values={values}
                />
              );
            }}
            cursor={{
              stroke: "#3385FF",
              fill: "#3385FF",
              opacity: 0.2,
              strokeDasharray: 2,
              strokeWidth: 0,
            }}
          />

          <XAxis
            hide={!showXAxis}
            dataKey={index.id as string}
            tickFormatter={(payload) =>
              index.format
                ? index.format(payload)
                : index.type === "date"
                ? new Date(payload).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : payload
            }
            style={{
              fontSize: "12px",
              fontFamily: "var(--chakra-fonts-body)",
            }}
            stroke="var(--chakra-colors-paragraph)"
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={5}
            domain={["dataMin - 86400000", "dataMax + 86400000"]}
            type="number"
            tick={{ transform: "translate(0, 6)" }}
            ticks={
              startEndOnly
                ? [
                    sortedData[0][index.id],
                    sortedData[data.length - 1][index.id],
                  ]
                : undefined
            }
          />

          <YAxis
            hide={!showYAxis}
            width={60}
            tickFormatter={(payload) => {
              return payload.toLocaleString();
            }}
            style={{
              fontSize: "12px",
              fontFamily: "var(--chakra-fonts-body)",
            }}
            type="number"
            stroke="var(--chakra-colors-paragraph)"
            tickLine={false}
            axisLine={false}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  );
};
