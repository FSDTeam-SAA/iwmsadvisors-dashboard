"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { useOverview } from "../../dashboard/hooks/useOverView";

const MONTH_NAMES: Record<string, string> = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

interface ServiceReportTableProps {
  readonly year: string;
}

export default function ServiceReportTable({ year }: ServiceReportTableProps) {
  const { data: overviewData, isLoading, isError } = useOverview(year);

  if (isLoading) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden">
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-gray-500">Generating report...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !overviewData?.success) {
    return null; // Error handled in charts component
  }

  const yearData = overviewData.data[year];
  const months = Object.keys(MONTH_NAMES);

  // Calculate trends (comparing to previous month)
  const getTrend = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? "up" : "stable";
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "stable";
  };

  return (
    <Card className="border shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="text-lg font-bold">Monthly Performance Breakdown</CardTitle>
        <p className="text-sm text-gray-500">Summary of all contacts and service requests for {year}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 transition-none">
                <TableHead className="w-[150px] font-bold text-gray-900">Month</TableHead>
                <TableHead className="text-right font-bold text-gray-900">Total Contacts</TableHead>
                <TableHead className="text-center font-bold text-gray-900">Trend</TableHead>
                <TableHead className="font-bold text-gray-900">Top Service</TableHead>
                <TableHead className="text-right font-bold text-gray-900">Service Coverage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {months.map((month, index) => {
                const stats = yearData?.[month];
                const prevMonth = index > 0 ? months[index - 1] : null;
                const prevStats = prevMonth ? yearData?.[prevMonth] : null;
                
                const currentTotal = stats?.total || 0;
                const prevTotal = prevStats?.total || 0;
                const trend = getTrend(currentTotal, prevTotal);

                // Find top service
                let topService = "None";
                let topCount = 0;
                if (stats?.counts) {
                  Object.entries(stats.counts).forEach(([service, count]) => {
                    if (count > topCount) {
                      topCount = count;
                      topService = service;
                    }
                  });
                }

                // Calculate service coverage (how many unique services requested)
                const serviceCount = stats?.counts ? Object.values(stats.counts).filter(c => c > 0).length : 0;
                const totalPossibleServices = stats?.counts ? Object.keys(stats.counts).length : 0;

                return (
                  <TableRow key={month} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-700">
                      {MONTH_NAMES[month]}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {currentTotal.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {trend === "up" && (
                          <div className="flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium border border-green-100">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            Growth
                          </div>
                        )}
                        {trend === "down" && (
                          <div className="flex items-center text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-xs font-medium border border-red-100">
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                            Decline
                          </div>
                        )}
                        {trend === "stable" && (
                          <div className="flex items-center text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-100">
                            <Minus className="w-3 h-3 mr-1" />
                            Stable
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 italic">
                      {topService}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-900">
                          {serviceCount}/{totalPossibleServices}
                        </span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#008AFF] transition-all duration-500" 
                            style={{ width: `${totalPossibleServices > 0 ? (serviceCount / totalPossibleServices) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
