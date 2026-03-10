"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpertiseSection from "../../Expertise/component/Expertise";
import CertificationsSection from "../../Certifications/component/Certifications";

export default function ExpertiseCertifications() {
  return (
    <div className="w-full mx-auto container p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Expertise & Certifications
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your professional expertise and certifications in one place.
        </p>
      </div>

      <Tabs defaultValue="expertise" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 cursor-pointer">
          <TabsTrigger value="expertise" className="cursor-pointer">
            Expertise
          </TabsTrigger>
          <TabsTrigger value="certifications" className="cursor-pointer">
            Certifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expertise" className="mt-2">
          <ExpertiseSection />
        </TabsContent>

        <TabsContent value="certifications" className="mt-2">
          <CertificationsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
