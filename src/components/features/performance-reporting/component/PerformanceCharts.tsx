"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useOverview } from "../../dashboard/hooks/useOverView";

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

const COLORS = [
  "#008AFF",
  "#82C9FF",
  "#8EAFC8",
  "#C4D1D9",
  "#A5B4FC",
  "#9333EA",
];

interface PerformanceChartsProps {
  readonly year: string;
}

export default function PerformanceCharts({ year }: PerformanceChartsProps) {
  const { data: overviewData, isLoading, isError } = useOverview(year);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <Card key={i} className="border shadow-sm rounded-xl overflow-hidden">
            <CardContent className="flex items-center justify-center h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !overviewData?.success) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden">
        <CardContent className="flex items-center justify-center h-[200px]">
          <p className="text-red-500">Error loading reporting data</p>
        </CardContent>
      </Card>
    );
  }

  const yearData = overviewData.data[year];
  
  // Transform data for trend chart
  const trendData = yearData
    ? Object.entries(yearData).map(([month, stats]) => ({
        name: MONTH_NAMES[month] || month,
        contacts: stats.total,
      }))
    : [];

  // Transform data for service distribution (current year total)
  const serviceAggregates: Record<string, number> = {};
  if (yearData) {
    Object.values(yearData).forEach((monthStats) => {
      Object.entries(monthStats.counts).forEach(([service, count]) => {
        serviceAggregates[service] = (serviceAggregates[service] || 0) + count;
      });
    });
  }

  const distributionData = Object.entries(serviceAggregates).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Monthly Contacts Trend */}
      <Card className="border shadow-sm rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Monthly Contact Trend</CardTitle>
          <p className="text-sm text-gray-500">Total contacts received per month in {year}</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#008AFF', strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="contacts"
                  stroke="#008AFF"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#008AFF', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#008AFF', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Service Distribution Bar Chart */}
      <Card className="border shadow-sm rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Service Distribution</CardTitle>
          <p className="text-sm text-gray-500">Total requests by service category in {year}</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "#4B5563" }}
                  width={100}
                />
                <Tooltip 
                   cursor={{ fill: '#F9FAFB' }}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
