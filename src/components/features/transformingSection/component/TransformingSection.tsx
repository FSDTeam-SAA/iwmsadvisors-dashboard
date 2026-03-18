"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Transforming from "../../transforming/component/Transforming";
import TransformingNumber from "../../transformingNumber/component/TransformingNumber";

export default function TransformingSection() {
  return (
    <div className="w-full mx-auto container p-6">
      <Tabs defaultValue="transform" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 cursor-pointer">
          <TabsTrigger value="transform" className="cursor-pointer">
            Transform Management
          </TabsTrigger>
          <TabsTrigger value="transforming-number" className="cursor-pointer">
            Transforming Number Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transform" className="mt-2">
          <Transforming />
        </TabsContent>

        <TabsContent value="transforming-number" className="mt-2">
          <TransformingNumber />
        </TabsContent>
      </Tabs>
    </div>
  );
}
