"use client";

import { useState } from "react";
import ContactUsSummery from "./ContactUsSummery";
import TopPerformingServices from "./TopPerformingServices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import RecentMessages from "./RecentMessages";

const YEARS = ["2024", "2025", "2026"];

export default function Overview() {
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">
            Filter by Year:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 min-w-[100px] justify-between"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactUsSummery year={selectedYear} />
        <TopPerformingServices year={selectedYear} />
      </div>
      <div className="mt-8">
        <div>
          <RecentMessages />
        </div>
      </div>
    </div>
  );
}
