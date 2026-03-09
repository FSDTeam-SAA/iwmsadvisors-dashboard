"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StrengthHeaderSection from "./StrengthHeaderSection";
import StrengthItemsSection from "./StrengthItemsSection";

export default function StrengthItemsManagement() {
  return (
    <div className="w-full mx-auto container p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Strength Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage heading, subtitle, and individual strength items.
        </p>
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
