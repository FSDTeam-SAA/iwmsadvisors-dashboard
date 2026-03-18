import HeroSection from "@/components/features/heroSection/component/HeroSection";
import React from "react";

export const metadata = {
  title: "Case Studies Hero | Admin Dashboard",
};

const page = () => {
  return <HeroSection filterOrder={2} />;
};

export default page;
