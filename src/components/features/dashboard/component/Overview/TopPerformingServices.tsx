"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown, Loader2 } from "lucide-react";
import { useOverview } from "../../hooks/useOverView";

const COLORS = [
  "#008AFF",
  "#82C9FF",
  "#8EAFC8",
  "#C4D1D9",
  "#A5B4FC",
  "#9333EA",
];

interface TopPerformingServicesProps {
  readonly year: string;
}

export default function TopPerformingServices({
  year,
}: TopPerformingServicesProps) {
  const { data: overviewData, isLoading, isError } = useOverview(year);

  if (isLoading) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden">
        <CardContent className="flex items-center justify-center h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !overviewData?.success) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden">
        <CardContent className="flex items-center justify-center h-[400px]">
          <p className="text-red-500">Error loading services data</p>
        </CardContent>
      </Card>
    );
  }

  // Get data for selected year
  const yearData = overviewData.data[year];
  const currentMonthData = yearData?.["jan"];

  const chartData = currentMonthData
    ? Object.entries(currentMonthData.percentages).map(
        ([name, value], index) => ({
          name,
          value,
          color: COLORS[index % COLORS.length],
        }),
      )
    : [];

  return (
    <Card className="border shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900">
            Top Performing Services
          </CardTitle>
          <p className="text-sm text-gray-500">
            See which services are booked the most by users in {year}.
          </p>
        </div>
        {/* <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-700">
          Monthly <ChevronDown className="w-4 h-4 text-gray-500" />
        </button> */}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full relative flex flex-col items-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-[400px]">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-gray-600 truncate">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
