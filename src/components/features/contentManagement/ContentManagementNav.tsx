"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Home, LayoutGrid, FileText, Users, UsersRound, Settings } from "lucide-react";

const categories = [
  {
    name: "Home",
    icon: Home,
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
    items: [
      { name: "Services Hero", href: "/content-management/services-hero" },
      { name: "Our Approach", href: "/content-management/our-approach" },
    ],
  },
  {
    name: "Case Studies",
    icon: FileText,
    items: [
      { name: "Case Studies Hero", href: "/content-management/case-studies-hero" },
      { name: "Case Studies", href: "/content-management/case-studies" },
    ],
  },
  {
    name: "Blog",
    icon: LayoutGrid,
    items: [
      { name: "Blog Hero", href: "/content-management/blog-hero" },
      { name: "Blog Section", href: "/content-management/blog-section" },
    ],
  },
  {
    name: "About Us",
    icon: Users,
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
    items: [
      { name: "Contact Hero", href: "/content-management/contact-hero" },
      { name: "Contact Services", href: "/content-management/contact-services" },
      { name: "Contact Information", href: "/content-management/contact-information" },
    ],
  },
  {
    name: "FAQ",
    icon: Settings,
    items: [
      { name: "FAQ Hero", href: "/content-management/faq-hero" },
      { name: "FAQ Section", href: "/content-management/faq-section" },
    ],
  },
];

export default function ContentManagementNav() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border-b sticky top-0 z-30 shadow-sm overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {categories.map((category) => {
          const isActive = category.items.some((item) => {
            const itemPath = item.href.split("?")[0];
            return pathname === itemPath;
          });

          return (
            <DropdownMenu key={category.name}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                    isActive
                      ? "bg-[#005696] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#005696]"
                  )}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isActive ? "text-white" : "text-gray-400")} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 mt-2 p-1 rounded-xl shadow-lg border border-gray-100">
                {category.items.map((item) => {
                  const isItemActive = pathname === item.href.split("?")[0];
                  return (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer",
                          isItemActive
                            ? "bg-[#005696]/10 text-[#005696] font-bold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#005696]"
                        )}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
    </div>
  );
}
