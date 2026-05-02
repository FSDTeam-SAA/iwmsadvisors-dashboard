import HeroSection from "@/components/features/heroSection/component/HeroSection";
import React from "react";

export const metadata = {
  title: "Blog Hero | Admin Dashboard",
};

const page = () => {
  return <HeroSection filterOrder={3} />;
};

export default page;
