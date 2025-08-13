"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface EnrollmentChartSectionProps {
  title: string;
  description: string;
  data: ChartDataPoint[];
  totalValue?: number;
  className?: string;
}

const chartConfig = {
  value: {
    label: "Enrollments",
    color: "hsl(142.1 76.2% 36.3%)", // emerald-600 for green bars
  },
} satisfies ChartConfig;

const EnrollmentChartSection: React.FC<EnrollmentChartSectionProps> = ({
  title,
  description,
  data,
  totalValue,
  className = "",
}) => {
  const formatDate = (dateString: string) => {
    try {
      // Handle both "Jan 1, 2024" and other formats
      return dateString.split(",")[0] || dateString;
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      className={`bg-white rounded-sm font-hanken border border-neutral-200 shadow-none ${className}`}
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-hanken text-neutral-800 font-bold">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {description}
              {totalValue && (
                <span className="ml-2 text-emerald-600 font-medium">
                  Total: {totalValue.toLocaleString()}
                </span>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            data={data}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              className="text-xs text-center text-dark-blue"
              tickFormatter={formatDate}
              textAnchor="end"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs text-gray-500"
              width={40}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => formatDate(label)}
                  formatter={(value) => [
                    `${value} enrollment${Number(value) !== 1 ? "s" : ""}`,
                    "Enrollments",
                  ]}
                />
              }
            />
            <Bar
              dataKey="value"
              fill="var(--color-value)"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EnrollmentChartSection;
