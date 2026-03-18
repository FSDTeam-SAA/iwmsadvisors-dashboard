import HeroSection from "@/components/features/heroSection/component/HeroSection";
import React from "react";

export const metadata = {
  title: "About Hero | Admin Dashboard",
};

const page = () => {
  return <HeroSection filterOrder={4} />;
};

export default page;
