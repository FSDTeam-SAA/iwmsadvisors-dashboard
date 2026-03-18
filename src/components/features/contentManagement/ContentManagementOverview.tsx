"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  ChevronRight, 
  Home, 
  LayoutGrid, 
  FileText, 
  Users, 
  UsersRound, 
  Settings,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    name: "Home",
    icon: Home,
    description: "Manage your landing page, logo, and core identity",
    items: [
      { name: "Logo Management", href: "/content-management/navbar" },
      { name: "Banner Management", href: "/content-management/introduction-section?tab=banner" },
      { name: "IWMS Solutions", href: "/content-management/iwms-solutions" },
      { name: "Why Choose Us", href: "/content-management/why-choose-us" },
      { name: "Our Proven Result", href: "/content-management/stats-section" },
      { name: "Consultant", href: "/content-management/consultant" },
      { name: "Footer", href: "/content-management/footer-section" },
    ],
  },
  {
    name: "Services",
    icon: LayoutGrid,
    description: "Update service hero and approach details",
    items: [
      { name: "Services Hero", href: "/content-management/services-hero" },
      { name: "Our Approach", href: "/content-management/our-approach" },
    ],
  },
  {
    name: "Case Studies",
    icon: FileText,
    description: "Manage portfolio and success stories",
    items: [
      { name: "Case Studies Hero", href: "/content-management/case-studies-hero" },
      { name: "Case Studies", href: "/content-management/case-studies" },
    ],
  },
  {
    name: "Blog",
    icon: LayoutGrid,
    description: "Control your blog content and hero section",
    items: [
      { name: "Blog Hero", href: "/content-management/blog-hero" },
      { name: "Blog Section", href: "/content-management/blog-section" },
    ],
  },
  {
    name: "About Us",
    icon: Users,
    description: "Define your mission, vision, and team strengths",
    items: [
      { name: "About Hero", href: "/content-management/about-hero" },
      { name: "Transform Management", href: "/content-management/transforming-section" },
      { name: "Mission & Vision", href: "/content-management/mission-vision" },
      { name: "Our Core Strengths", href: "/content-management/strength-section" },
      { name: "Expertise & Certifications", href: "/content-management/expertise-certifications" },
    ],
  },
  {
    name: "Contact Us",
    icon: UsersRound,
    description: "Handle contact information and hero settings",
    items: [
      { name: "Contact Hero", href: "/content-management/contact-hero" },
      { name: "Contact Services", href: "/content-management/contact-services" },
      { name: "Contact Information", href: "/content-management/contact-information" },
    ],
  },
  {
    name: "FAQ",
    icon: Settings,
    description: "Manage frequently asked questions and help content",
    items: [
      { name: "FAQ Hero", href: "/content-management/faq-hero" },
      { name: "FAQ Section", href: "/content-management/faq-section" },
    ],
  },
];

export default function ContentManagementOverview() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories.map(c => c.name));

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-500 max-w-2xl text-lg">
          Central hub for managing all your website sections. Select a category below to explore and update its content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.name);
          return (
            <div key={category.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <button 
                onClick={() => toggleCategory(category.name)}
                className="w-full text-left p-6 flex items-start gap-4 focus:outline-none"
              >
                <div className="p-3 bg-[#005696]/10 rounded-xl text-[#005696]">
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                    <div className="p-1 rounded-lg bg-gray-50 text-gray-400 group-hover:text-[#005696] transition-colors">
                      {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                </div>
              </button>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out px-6 pb-6",
                isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between p-3 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-[#005696]/5 hover:border-[#005696]/20 transition-all duration-200"
                    >
                      <span className="text-gray-700 font-semibold text-[14px] group-hover:text-[#005696]">{item.name}</span>
                      <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                        <ArrowRight className="h-4 w-4 text-[#005696]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
