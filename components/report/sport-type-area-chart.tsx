"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SportMapBucket } from "@/lib/types";
import { normalizeChartData } from "./sport-type-chart";
import { formatSecondsToTime } from "@/lib/utils";

const chartConfig = {
  DRIVING: { label: "Driving", color: "var(--chart-1)" },
  WALKING: { label: "Walking", color: "var(--chart-2)" },
  CYCLING: { label: "Cycling", color: "var(--chart-3)" },
  NO_MAP: { label: "No Map", color: "var(--chart-4)" },
} satisfies ChartConfig;

export interface SportAreaChartProps {
  sportMapTypes: SportMapBucket[];
  fromDate: number;
  toDate: number;
}

export const sportChartColors = {
  DRIVING: {
    stroke: "#38BDF8",
    gradientId: "fill-driving",
    gradient: {
      start: "#38BDF8",
      stop: "#38BDF8",
    },
  },
  WALKING: {
    stroke: "#60A5FA",
    gradientId: "fill-walking",
    gradient: {
      start: "#60A5FA",
      stop: "#60A5FA",
    },
  },
  CYCLING: {
    stroke: "#A78BFA",
    gradientId: "fill-cycling",
    gradient: {
      start: "#A78BFA",
      stop: "#A78BFA",
    },
  },
  NO_MAP: {
    stroke: "#2DD4BF",
    gradientId: "fill-no_map",
    gradient: {
      start: "#2DD4BF",
      stop: "#2DD4BF",
    },
  },
} as const;

export function SportTypeAreaChart({
  sportMapTypes,
  fromDate,
  toDate,
}: SportAreaChartProps) {
  const chartData = normalizeChartData(fromDate, toDate, sportMapTypes);

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="self-center">
        <CardTitle>Time by Map Type</CardTitle>
      </CardHeader>

      <CardContent className="px-0 flex-1 flex flex-col justify-center pr-5">
        <ChartContainer
          config={chartConfig}
          className="w-auto xl:aspect-[3/1] aspect-[2/1]"
        >
          <AreaChart data={chartData}>
            <defs>
              {Object.entries(sportChartColors).map(
                ([, { gradientId, gradient }]) => (
                  <linearGradient
                    key={gradientId}
                    id={gradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={gradient.start}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor={gradient.stop}
                      stopOpacity={0}
                    />
                  </linearGradient>
                )
              )}
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (value as string).slice(0, 5)}
            />
            <YAxis
              tickFormatter={(value) => formatSecondsToTime(Number(value))}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatValue={(value) =>
                    formatSecondsToTime(Number(value) ?? 0)
                  }
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />

            <Area
              dataKey="DRIVING"
              stroke="#38BDF8"
              fill="url(#fill-driving)"
            />
            <Area
              dataKey="WALKING"
              stroke="#60A5FA"
              fill="url(#fill-walking)"
            />
            <Area
              dataKey="CYCLING"
              stroke="#A78BFA"
              fill="url(#fill-cycling)"
            />
            <Area dataKey="NO_MAP" stroke="#2DD4BF" fill="url(#fill-no_map)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
