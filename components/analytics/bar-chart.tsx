import { CustomToolTip } from "./custom-tooltip";
import { Box, BoxProps } from "@chakra-ui/react";
import { useId } from "react";
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

export interface BarChartProps<
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

  categories: Array<{
    id: keyof TData;
    label?: string;
    color?: string;
    format?: (value: number) => string;
  }>;
  showXAxis?: boolean;
  showYAxis?: boolean;
  startEndOnly?: boolean;
}

export const BarChart = <
  TData extends GenericDataType,
  TIndexKey extends keyof TData,
>({
  data,
  index,
  categories,
  showXAxis,
  showYAxis,
  startEndOnly,
  ...boxProps
}: BarChartProps<TData, TIndexKey>) => {
  const id = useId();

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
              stackId="a"
              stroke={cat.color || "#3385FF"}
              fill={`url(#bar_color_${id}_${cat.id as string})`}
              strokeWidth={0}
            />
          ))}
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={({ active, payload }) => {
              const payloadKey = payload?.[0]?.dataKey;
              const category = categories.find((cat) => cat.id === payloadKey);
              return (
                <CustomToolTip
                  active={active}
                  payload={payload}
                  valueLabel={category?.label || ""}
                  valueFormatter={category?.format}
                />
              );
            }}
            cursor={{
              stroke: "#3385FF",
              fill: "#3385FF",
              opacity: 0.3,
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
            domain={["dataMin", "dataMax"]}
            type="number"
            tick={{ transform: "translate(0, 6)" }}
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
              const category = categories[0];
              return category?.format
                ? category.format(payload)
                : payload.toString();
            }}
            style={{
              fontSize: "12px",
              fontFamily: "var(--chakra-fonts-body)",
            }}
            tick={{ transform: "translate(-3, 0)" }}
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
