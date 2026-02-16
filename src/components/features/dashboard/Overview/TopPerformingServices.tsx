"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { name: "IWMS Consulting", value: 60, color: "#008AFF" },
  { name: "IWMS Implementation", value: 20, color: "#82C9FF" },
  { name: "System Integration", value: 15, color: "#8EAFC8" },
  { name: "Managed Support", value: 5, color: "#C4D1D9" },
];

export default function TopPerformingServices() {
  return (
    <Card className="border shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900">
            Top Performing Services
          </CardTitle>
          <p className="text-sm text-gray-500">
            See which services are booked the most by users.
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-700">
          Monthly <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full relative flex flex-col items-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Custom Labels (optional, positioned roughly based on screenshot) */}
          <div className="absolute top-[40px] left-[20%] text-xs font-medium text-gray-500">
            15%
          </div>
          <div className="absolute top-[10px] left-[45%] text-xs font-medium text-gray-500">
            5%
          </div>
          <div className="absolute top-[45%] right-[5%] text-xs font-medium text-gray-500">
            60%
          </div>
          <div className="absolute bottom-[20%] left-[20%] text-xs font-medium text-gray-500">
            20%
          </div>

          {/* Legend */}
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-[400px]">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-gray-600 truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
