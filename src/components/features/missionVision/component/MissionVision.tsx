"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MissionSection from "./Mission";
import VisionSection from "./Vision";

export default function MissionVision() {
  return (
    <div className="w-full mx-auto container p-6">
      {/* Tabs */}
      <Tabs defaultValue="mission" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 cursor-pointer ">
          <TabsTrigger value="mission" className="cursor-pointer">
            Mission
          </TabsTrigger>
          <TabsTrigger value="vision" className="cursor-pointer">
            Vision
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mission" className="mt-2">
          <MissionSection />
        </TabsContent>

        <TabsContent value="vision" className="mt-2">
          <VisionSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
