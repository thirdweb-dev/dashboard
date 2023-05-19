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

const BAR_COLORS = ["#3385FF"];

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

  if (!data.length) {
    return null;
  }

  if (!index.type) {
    index.type = "date";
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
              stackId={`${cat.id as string}`}
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
            domain={["dataMin - 86400000", "dataMax + 86400000"]}
            type="number"
            ticks={
              startEndOnly
                ? [data[0][index.id], data[data.length - 1][index.id]]
                : undefined
            }
          />

          <YAxis
            hide={!showYAxis}
            width={60}
            tickFormatter={(payload) => {
              return payload.toString();
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
