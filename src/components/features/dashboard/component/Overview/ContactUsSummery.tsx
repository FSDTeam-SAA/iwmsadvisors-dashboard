"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, Loader2 } from "lucide-react";
import { useOverview } from "../../hooks/useOverView";

const MONTH_NAMES: Record<string, string> = {
  jan: "Jan",
  feb: "Feb",
  mar: "Mar",
  apr: "Apr",
  may: "May",
  jun: "Jun",
  jul: "Jul",
  aug: "Aug",
  sep: "Sep",
  oct: "Oct",
  nov: "Nov",
  dec: "Dec",
};

interface ContactUsSummeryProps {
  readonly year: string;
}

export default function ContactUsSummery({ year }: ContactUsSummeryProps) {
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
          <p className="text-red-500">Error loading contact stats</p>
        </CardContent>
      </Card>
    );
  }

  // Transform data for the line chart
  const yearData = overviewData.data[year];
  const chartData = yearData
    ? Object.entries(yearData).map(([month, stats]) => ({
        name: MONTH_NAMES[month] || month,
        value: stats.total,
      }))
    : [];

  return (
    <Card className="border shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900">
            Contact Us
          </CardTitle>
          <p className="text-sm text-gray-500">
            Track total revenue, platform commission, and payouts in {year}.
          </p>
        </div>
        {/* <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-700">
          Monthly <ChevronDown className="w-4 h-4 text-gray-500" />
        </button> */}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border rounded-lg shadow-lg p-3 text-center">
                        <p className="text-xs text-gray-500 font-medium">
                          {label} {year}
                        </p>
                        <p className="text-sm font-bold text-[#008AFF]">
                          {payload[0]?.value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#008AFF"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#008AFF",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
