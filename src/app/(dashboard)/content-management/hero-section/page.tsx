import HeroSection from "@/components/features/heroSection/component/HeroSection";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
    </div>
  );
}
