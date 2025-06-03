"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useState } from "react";
import { SportReportTypeItem } from "@/lib/types";
import { sportChartColors } from "./sport-type-area-chart";

export const formatSportType = (type: string) => {
  return (
    type.charAt(0).toUpperCase() + type.slice(1).replace("_", "").toLowerCase()
  );
};

export function SportReportView({
  items,
  total,
}: {
  items: SportReportTypeItem[];
  total: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const chartData = items.map((item) => {
    const key = item.type as keyof typeof sportChartColors;
    const color = sportChartColors[key]?.stroke ?? "#60A5FA";

    return {
      ...item,
      fill: color,
      numberActivities: item.numberActivities,
      type: formatSportType(item.type),
    };
  });

  const chartConfig = chartData.reduce((config, item) => {
    config[item.type] = {
      label: item.type,
    };
    config["numberActivities"] = { label: "Activity" };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col xl:min-w-[450px] min-w-[350px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Activity Sport Report</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartLegend content={<ChartLegendContent />} />

            <Pie
              data={chartData}
              dataKey="numberActivities"
              nameKey="type"
              innerRadius={80}
              strokeWidth={10}
              activeIndex={selectedIndex}
              paddingAngle={1}
              activeShape={({
                outerRadius = 0,
                innerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector
                  {...props}
                  outerRadius={outerRadius + 5}
                  innerRadius={innerRadius - 5}
                />
              )}
              onClick={(data, index) => {
                if (selectedIndex === index) {
                  setSelectedIndex(-1);
                } else {
                  setSelectedIndex(index);
                }
              }}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {selectedIndex > -1
                            ? chartData[selectedIndex].numberActivities
                            : total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-base"
                        >
                          {selectedIndex > -1
                            ? `${chartData[selectedIndex].type}`
                            : "Total Activities"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
