"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LogOut,
  ShoppingBasket,
  LayoutDashboard,
  UsersRound,
  Settings,
  ClockPlus,
  BowArrow,
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  LayoutGrid,
  Users,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  subItems?: NavItem[];
}

const navigation: NavItem[] = [
  { name: "Dashboard Overview", href: "/", icon: LayoutDashboard },

  { name: "Contact Management", href: "/contact-management", icon: UsersRound },

  {
    name: "Content Management",
    href: "/content-management",
    icon: FolderKanban,
    subItems: [
      {
        name: "Home",
        href: "/content-management/navbar",
        icon: Home,
        subItems: [
          { name: "Logo Management", href: "/content-management/logo" },
          {
            name: "Banner Management",
            href: "/content-management/introduction-section?tab=banner",
          },
          // {
          //   name: "About IWMS",
          //   href: "/content-management/introduction-section?tab=about",
          // },
          {
            name: "IWMS Solutions",
            href: "/content-management/iwms-solutions",
          },
          { name: "Why Choose Us", href: "/content-management/why-choose-us" },
          {
            name: "Our Proven Result",
            href: "/content-management/stats-section",
          },
          { name: "Consultant", href: "/content-management/consultant" },
          { name: "Footer", href: "/content-management/footer-section" },
        ],
      },
      {
        name: "Services",
        href: "/content-management/services-hero",
        icon: LayoutGrid,
        subItems: [
          { name: "Services Hero", href: "/content-management/services-hero" },
          { name: "Our Approach", href: "/content-management/our-approach" },
        ],
      },
      {
        name: "Case Studies",
        href: "/content-management/case-studies-hero",
        icon: FileText,
        subItems: [
          {
            name: "Case Studies Hero",
            href: "/content-management/case-studies-hero",
          },
          { name: "Case Studies", href: "/content-management/case-studies" },
        ],
      },
      {
        name: "Blog",
        href: "/content-management/blog-hero",
        icon: LayoutGrid,
        subItems: [
          { name: "Blog Hero", href: "/content-management/blog-hero" },
          { name: "Blog Section", href: "/content-management/blog-section" },
        ],
      },
      {
        name: "About Us",
        href: "/content-management/about-hero",
        icon: Users,
        subItems: [
          { name: "About Hero", href: "/content-management/about-hero" },
          {
            name: "Transform Management",
            href: "/content-management/transforming-section",
          },
          {
            name: "Mission & Vision",
            href: "/content-management/mission-vision",
          },
          {
            name: "Our Core Strengths",
            href: "/content-management/strength-section",
          },
          {
            name: "Expertise & Certifications",
            href: "/content-management/expertise-certifications",
          },
        ],
      },
      {
        name: "Contact Us",
        href: "/content-management/contact-hero",
        icon: UsersRound,
        subItems: [
          { name: "Contact Hero", href: "/content-management/contact-hero" },
          {
            name: "Contact Services",
            href: "/content-management/contact-services",
          },
          {
            name: "Contact Information",
            href: "/content-management/contact-information",
          },
        ],
      },
      {
        name: "FAQ",
        href: "/content-management/faq-hero",
        icon: Settings,
        subItems: [
          { name: "FAQ Hero", href: "/content-management/faq-hero" },
          { name: "FAQ Section", href: "/content-management/faq-section" },
        ],
      },
    ],
  },
  // {
  //   name: "Case Study",
  //   href: "/content-management/case-studies",
  //   icon: ShoppingBasket,
  // },

  {
    name: "Service Management",
    href: "/service-management",
    icon: ShoppingBasket,
  },
  {
    name: "Application Management",
    href: "/application-management",
    icon: FileText,
  },
  {
    name: "Career Management",
    href: "/career-management",
    icon: BowArrow,
  },
  {
    name: "Performance & Reporting",
    href: "/performance-reporting",
    icon: ClockPlus,
  },
  { name: "Settings", href: "/settings", icon: Settings },
];

const normalizePath = (href: string) => href.split("?")[0];

const findParents = (
  items: NavItem[],
  pathname: string,
  parents: string[] = [],
): string[] => {
  for (const item of items) {
    const normalizedHref = normalizePath(item.href);
    const isMatch = pathname === normalizedHref;

    if (isMatch) {
      if (item.subItems?.length) {
        return [...parents, item.name];
      }
      return parents;
    }

    if (item.subItems?.length) {
      const childResult = findParents(item.subItems, pathname, [
        ...parents,
        item.name,
      ]);
      if (childResult.length) return childResult;
    }
  }
  return [];
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(() =>
    findParents(navigation, pathname),
  );
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenus(findParents(navigation, pathname));
  }

  const hasActiveChild = (item: NavItem): boolean => {
    if (!item.subItems?.length) return false;

    return item.subItems.some((sub) => {
      const isDirectMatch = pathname === normalizePath(sub.href);
      const isNestedMatch = hasActiveChild(sub);
      return isDirectMatch || isNestedMatch;
    });
  };

  const toggleMenu = (name: string, level: number) => {
    setOpenMenus((prev) => {
      const newMenus = prev.slice(0, level);

      if (prev[level] === name) {
        return newMenus;
      }

      newMenus[level] = name;
      return newMenus;
    });
  };

  const handleLogout = () => {
    setOpen(false);
    signOut({ callbackUrl: "/login" });
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => {
      const hasSubItems = !!item.subItems?.length;
      const isMenuOpen = openMenus[level] === item.name;
      const isCurrentPath = pathname === normalizePath(item.href);
      const isChildActive = hasActiveChild(item);
      const isActive = isCurrentPath || isChildActive;

      return (
        <div key={`${level}-${item.name}`} className="space-y-1">
          {hasSubItems ? (
            <div className="space-y-1">
              <button
                onClick={() => toggleMenu(item.name, level)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 cursor-pointer group",
                  level === 0 && isActive
                    ? "bg-[#005696]/10 text-[#005696]"
                    : level > 0 && isActive
                      ? "bg-[#005696]/5 text-[#005696]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#005696]",
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon ? (
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-[#005696]"
                          : "text-gray-400 group-hover:text-[#005696]",
                      )}
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-[#005696]" />
                  )}
                  <span className={cn(level > 0 && "text-[14px]")}>
                    {item.name}
                  </span>
                </div>

                {isMenuOpen ? (
                  <ChevronDown className="h-4 w-4 opacity-70" />
                ) : (
                  <ChevronRight className="h-4 w-4 opacity-40" />
                )}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out space-y-1",
                  isMenuOpen
                    ? "max-h-[1000px] opacity-100 py-1"
                    : "max-h-0 opacity-0 py-0",
                  level === 0 ? "pl-6" : "pl-5",
                )}
              >
                {renderNavItems(item.subItems!, level + 1)}
              </div>
            </div>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 group",
                isActive
                  ? "text-[#005696] font-bold bg-[#005696]/5"
                  : "text-gray-500 hover:text-[#005696] hover:bg-gray-50",
              )}
            >
              {item.icon ? (
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-[#005696]"
                      : "text-gray-400 group-hover:text-[#005696]",
                  )}
                />
              ) : (
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-200",
                    isActive
                      ? "bg-[#005696]"
                      : "bg-gray-300 group-hover:bg-[#005696]",
                  )}
                />
              )}
              <span
                className={cn(
                  level > 0 ? "text-[14px]" : "text-[15px] font-semibold",
                )}
              >
                {item.name}
              </span>
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-screen w-68 flex-col bg-white border-r border-gray-100 fixed z-40">
      {/* Logo */}
      <div className="flex items-center py-8 justify-center px-8 border-b border-gray-50/50">
        <Link
          href="/"
          className="flex items-center w-full justify-center hover:opacity-90 transition-opacity"
        >
          <picture>
            <source media="(min-width:1280px)" srcSet="/images/logo-xl.svg" />
            <source media="(min-width:1024px)" srcSet="/images/logo-lg.svg" />
            <source media="(min-width:768px)" srcSet="/images/logo-md.svg" />
            <source media="(min-width:640px)" srcSet="/images/logo-sm.svg" />

            <Image
              src="/images/logo-mobile.svg"
              alt="IWMS Advisors Logo"
              width={180}
              height={80}
              className="w-full h-auto"
              priority
            />
          </picture>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 no-scrollbar">
        {renderNavItems(navigation)}
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto">
        <div className="bg-gray-50/50 rounded-2xl p-2 border border-gray-100/50">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-11 px-3 cursor-pointer rounded-xl font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
              >
                <div className="p-1.5 rounded-lg bg-red-100/50 transition-colors group-hover:bg-red-100">
                  <LogOut className="h-4 w-4" />
                </div>
                <span className="text-[15px]">Log Out</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Confirm Logout
                </DialogTitle>
                <DialogDescription className="text-gray-500">
                  Are you sure you want to log out of your session?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex justify-end gap-3 mt-4">
                <Button
                  className="cursor-pointer rounded-xl px-6 h-11 font-semibold"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="cursor-pointer rounded-xl px-6 h-11 font-semibold bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg shadow-red-500/20"
                  variant="destructive"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
