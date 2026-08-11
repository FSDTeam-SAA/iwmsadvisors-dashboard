import HeroSection from "@/components/features/heroSection/component/HeroSection";
import React from "react";

export const metadata = {
  title: "FAQ Hero | Admin Dashboard",
};

const page = () => {
  return <HeroSection filterOrder={5} />;
};

export default page;
