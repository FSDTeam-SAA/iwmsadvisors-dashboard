"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BannerSection from "../bannerSection/component/BannerSection";
import HeroSection from "../heroSection/component/HeroSection";
import AboutSection from "../aboutSection/component/AboutSection";

export default function IntroductionSectionManagement() {
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Introduction Section
        </h1>
        <nav className="flex items-center text-sm text-gray-500 mt-1">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 font-medium">Introduction Section</span>
        </nav>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <Tabs defaultValue="banner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 font-bold text-lg ">
            <TabsTrigger value="banner" className="font-black cursor-pointer text-[#0057B8]">Banner Section</TabsTrigger>
            <TabsTrigger value="hero" className="font-black cursor-pointer text-[#0057B8]">Hero Section</TabsTrigger>
            <TabsTrigger value="about" className="font-black cursor-pointer text-[#0057B8]">About Section</TabsTrigger>
          </TabsList>
          
          <TabsContent value="banner" className="mt-0">
            <BannerSection showHeader={false} />
          </TabsContent>
          
          <TabsContent value="hero" className="mt-0">
            <HeroSection showHeader={false} />
          </TabsContent>
          
          <TabsContent value="about" className="mt-0">
            <AboutSection showHeader={false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
