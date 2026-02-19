"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Calendar } from "lucide-react";
import PerformanceCharts from "./PerformanceCharts";
import ServiceReportTable from "./ServiceReportTable";

const YEARS = ["2024", "2025", "2026"];

export default function PerformanceReporting() {
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance & Reporting</h1>
          <p className="text-gray-500 mt-1">Detailed analysis of contact trends and service performance.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            Year:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 min-w-[100px] justify-between h-8 px-2 hover:bg-gray-100"
              >
                {selectedYear}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px]">
              {YEARS.map((year) => (
                <DropdownMenuItem
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className="cursor-pointer"
                >
                  {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-8">
        <PerformanceCharts year={selectedYear} />
        <ServiceReportTable year={selectedYear} />
      </div>
    </div>
  );
}
