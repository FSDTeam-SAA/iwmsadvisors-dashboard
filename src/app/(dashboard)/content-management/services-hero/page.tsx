import HeroSection from "@/components/features/heroSection/component/HeroSection";
import React from "react";

export const metadata = {
  title: "Services Hero | Admin Dashboard",
};

const page = () => {
  return <HeroSection filterOrder={1} />;
};

export default page;
