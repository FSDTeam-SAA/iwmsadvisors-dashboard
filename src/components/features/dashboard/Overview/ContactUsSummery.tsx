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
import { ChevronDown } from "lucide-react";

const data = [
  { name: "Feb", value: 4000 },
  { name: "Mar", value: 3000 },
  { name: "Apr", value: 5000 },
  { name: "May", value: 4500 },
  { name: "Jun", value: 12000 },
  { name: "Jul", value: 6000 },
  { name: "Aug", value: 7500 },
  { name: "Sep", value: 6500 },
  { name: "Oct", value: 9000 },
  { name: "Nov", value: 8500 },
  { name: "Dec", value: 11000 },
  { name: "Jan", value: 13000 },
];

export default function ContactUsSummery() {
  return (
    <Card className="border shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900">
            Contact Us
          </CardTitle>
          <p className="text-sm text-gray-500">
            Track total revenue, platform commission, and payouts over time.
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-700">
          Monthly <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
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
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border rounded-lg shadow-lg p-3 text-center">
                        <p className="text-xs text-gray-500 font-medium">
                          June 2025
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
