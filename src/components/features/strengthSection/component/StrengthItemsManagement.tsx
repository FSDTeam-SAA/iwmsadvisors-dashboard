"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import StrengthHeaderSection from "./StrengthHeaderSection";
import StrengthItemsSection from "./StrengthItemsSection";

export default function StrengthItemsManagement() {
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Strength Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Strength Management
            </span>
          </nav>
        </div>
      </div>

      <Tabs defaultValue="strength" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 cursor-pointer">
          <TabsTrigger value="strength" className="cursor-pointer">
            Strength
          </TabsTrigger>
          <TabsTrigger value="items" className="cursor-pointer">
            Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strength" className="mt-2">
          <StrengthHeaderSection />
        </TabsContent>

        <TabsContent value="items" className="mt-2">
          <StrengthItemsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
