"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
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

  // Aggregate counts for the whole year
  const aggregatedCounts: Record<string, number> = {};
  let totalBookings = 0;

  if (yearData) {
    Object.values(yearData).forEach((monthData) => {
      const counts = monthData?.counts;
      if (counts) {
        Object.entries(counts).forEach(([serviceName, count]) => {
          aggregatedCounts[serviceName] = (aggregatedCounts[serviceName] || 0) + count;
          totalBookings += count;
        });
      }
    });
  }

  const chartData = Object.entries(aggregatedCounts)
    .sort((a, b) => b[1] - a[1]) // Sort descending by count
    .map(([name, count], index) => {
      const value = totalBookings > 0 ? Number(((count / totalBookings) * 100).toFixed(1)) : 0;
      return {
        name,
        value,
        color: COLORS[index % COLORS.length],
      };
    })
    .filter(item => item.value > 0); // Only include services with bookings

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
      </CardHeader>
      <CardContent className="">
        <div className="h-[300px] w-full relative flex flex-col items-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Tooltip 
                formatter={(value, name) => [`${value ?? 0}%`, String(name)]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
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
