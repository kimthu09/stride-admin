"use client";

import { eachDayOfInterval, format } from "date-fns";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SportMapBucket, SportMapValue } from "@/lib/types";
import { sportChartColors } from "./sport-type-area-chart";

const chartConfig = {
  DRIVING: { label: "Driving", color: "var(--chart-1)" },
  WALKING: { label: "Walking", color: "var(--chart-2)" },
  CYCLING: { label: "Cycling", color: "var(--chart-3)" },
  NO_MAP: { label: "No Map", color: "var(--chart-4)" },
} satisfies ChartConfig;

function getDateLabelsInRange(from: number, to: number): string[] {
  return eachDayOfInterval({
    start: new Date(from),
    end: new Date(to),
  }).map((date) => format(date, "dd-MM-yyyy"));
}

export function normalizeChartData(
  from: number,
  to: number,
  sportMapTypes: SportMapBucket[]
): { date: string; [key: string]: number | string }[] {
  const dateLabels = getDateLabelsInRange(from, to);

  const bucketMap = new Map<string, SportMapValue[]>();
  sportMapTypes.forEach((bucket) => {
    const dateStr = format(new Date(bucket.from), "dd-MM-yyyy");
    bucketMap.set(dateStr, bucket.values);
  });

  return dateLabels.map((date) => {
    const values = bucketMap.get(date) ?? [];
    const defaultValues = {
      DRIVING: 0,
      WALKING: 0,
      CYCLING: 0,
      NO_MAP: 0,
    };

    values.forEach((v) => {
      const key = v.type as keyof typeof defaultValues;
      defaultValues[key] = v.numberActivities;
    });

    return {
      date,
      ...defaultValues,
    };
  });
}

export function normalizeTimeChartData(
  from: number,
  to: number,
  sportMapTypes: SportMapBucket[]
): { date: string; [key: string]: number | string }[] {
  const dateLabels = getDateLabelsInRange(from, to);

  const bucketMap = new Map<string, SportMapValue[]>();
  sportMapTypes.forEach((bucket) => {
    const dateStr = format(new Date(bucket.from), "dd-MM-yyyy");
    bucketMap.set(dateStr, bucket.values);
  });

  return dateLabels.map((date) => {
    const values = bucketMap.get(date) ?? [];
    const defaultValues = {
      DRIVING: 0,
      WALKING: 0,
      CYCLING: 0,
      NO_MAP: 0,
    };

    values.forEach((v) => {
      const key = v.type as keyof typeof defaultValues;
      defaultValues[key] = v.time;
    });

    return {
      date,
      ...defaultValues,
    };
  });
}
export interface SportLineChartProps {
  sportMapTypes: SportMapBucket[];
  fromDate: number;
  toDate: number;
}

export function SportTypeChart({
  sportMapTypes,
  fromDate,
  toDate,
}: SportLineChartProps) {
  const chartData = normalizeChartData(fromDate, toDate, sportMapTypes);

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="self-center">
        <CardTitle>Activities by Map Type</CardTitle>
      </CardHeader>

      <CardContent className="px-0 flex-1 flex flex-col justify-center pr-5">
        <ChartContainer
          config={chartConfig}
          className="w-auto 2xl:aspect-video xl:aspect-square aspect-video"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (value as string).slice(0, 5)}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="DRIVING"
              stackId="a"
              fill={sportChartColors.DRIVING.stroke}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="CYCLING"
              stackId="a"
              fill={sportChartColors.CYCLING.stroke}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="WALKING"
              stackId="a"
              fill={sportChartColors.WALKING.stroke}
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="NO_MAP"
              stackId="a"
              fill={sportChartColors.NO_MAP.stroke}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
