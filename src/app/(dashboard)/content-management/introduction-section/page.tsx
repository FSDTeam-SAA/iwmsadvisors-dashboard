import IntroductionSectionManagement from "@/components/features/introductionSection/IntroductionSectionManagement";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <IntroductionSectionManagement />
      </Suspense>
    </div>
  );
}
