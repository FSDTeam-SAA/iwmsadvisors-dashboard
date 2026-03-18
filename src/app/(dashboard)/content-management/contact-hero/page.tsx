import HeroSection from "@/components/features/heroSection/component/HeroSection";
import React from "react";

export const metadata = {
  title: "Contact Hero | Admin Dashboard",
};

const page = () => {
  // Mapping: 1: Service, 2: Case Studies, 3: Blog, 4: About, 5: FAQ, 6: Careers/Need? 
  // The user didn't specify the order for Contact Hero, but Careers is 6.
  // I'll check the HeroCard mapping again.
  return <HeroSection filterOrder={7} />; // Mapping 7 for Contact/Need? Wait, let's check HeroCard.
};

export default page;
