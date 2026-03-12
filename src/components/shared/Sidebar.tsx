"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LogOut,
  ShoppingBasket,
  LayoutDashboard,
  UsersRound,
  TvMinimalPlay,
  Settings,
  ClockPlus,
  BowArrow,
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  LayoutGrid,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
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

const navigation = [
  { name: "Dashboard Overview", href: "/", icon: LayoutDashboard },

  { name: "Contact Management", href: "/contact-management", icon: UsersRound },
  {
    name: "Content Management",
    href: "/content-management",
    icon: TvMinimalPlay,
    subItems: [
      {
        name: "Home",
        isGroup: true,
        items: [
          {
            name: "Banner",
            href: "/content-management/introduction-section?tab=banner",
          },
          {
            name: "About Us",
            href: "/content-management/introduction-section?tab=about",
          },
          {
            name: "IWMS Solutions",
            href: "/content-management/iwms-solutions",
          },
          {
            name: "Stats Management Section",
            href: "/content-management/stats-section",
          },
        ],
      },

      {
        name: "Service",
        isGroup: true,
        items: [
          {
            name: "Hero",
            href: "/content-management/introduction-section?tab=hero",
          },
          {
            name: "IWMS Solutions Section",
            href: "/content-management/iwms-solutions",
          },
        ],
      },
      {
        name: "About",
        isGroup: true,
        items: [
          {
            name: "Transforming",
            href: "/content-management/transforming",
          },
          {
            name: "Transforming Number",
            href: "/content-management/transforming-number",
          },
          {
            name: "Strength Management",
            href: "/content-management/strength-section",
          },
          {
            name: "Expertise & Certifications",
            href: "/content-management/expertise-certifications",
          },
                {
        name: "Mission Vision",
        href: "/content-management/mission-vision",
      },
        ],
      },
      { name: "logo Section", href: "/content-management/navbar" },
      { name: "Case Study", href: "/content-management/case-study" },
      { name: "MREF Section", href: "/content-management/mref-section" },
      { name: "FAQ Section", href: "/content-management/faq-section" },
      { name: "Blog Section", href: "/content-management/blog-section" },
      {
        name: "Contact Information",
        href: "/content-management/contact-information",
      },
      {
        name: "Footer Section",
        href: "/content-management/footer-section",
      },

    ],
  },
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

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Content Management"]);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  // Auto-expand menus and groups based on pathname
  useEffect(() => {
    navigation.forEach((item) => {
      const isItemActive =
        item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
      if (isItemActive && !openMenus.includes(item.name)) {
        setOpenMenus([item.name]);
      }

      item.subItems?.forEach((subItem) => {
        if (subItem.isGroup) {
          const hasActiveChild = subItem.items?.some((groupItem) => {
            const itemPath = groupItem.href.split("?")[0];
            return pathname === itemPath;
          });
          if (hasActiveChild && !openGroups.includes(subItem.name)) {
            setOpenGroups([subItem.name]);
          }
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => (prev.includes(name) ? [] : [name]));
  };

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => (prev.includes(name) ? [] : [name]));
  };

  const handleLogout = () => {
    // NextAuth signOut with redirect to login page
    setOpen(false);
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex h-screen w-68 flex-col bg-[#FFFFFF] border-r border-gray-200 fixed">
      {/* Logo */}
      <div className="flex items-center py-5 justify-center px-6">
        <Link href="/" className="flex items-center w-full justify-center">
          <picture>
            {/* XL Screens */}
            <source media="(min-width:1280px)" srcSet="/images/logo-xl.svg" />

            {/* LG Screens */}
            <source media="(min-width:1024px)" srcSet="/images/logo-lg.svg" />

            {/* MD Screens */}
            <source media="(min-width:768px)" srcSet="/images/logo-md.svg" />

            {/* SM Screens */}
            <source media="(min-width:640px)" srcSet="/images/logo-sm.svg" />

            {/* Default (Mobile) */}
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
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isMenuOpen = openMenus.includes(item.name);
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <div key={item.name} className="space-y-1">
              {hasSubItems ? (
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 rounded-lg p-3 text-base leading-[150%] tracking-[0%] font-semibold transition-colors cursor-pointer",
                    isActive
                      ? "bg-[#005696] text-[#FFFFFF] font-bold"
                      : "text-[#111111] hover:bg-[#005696]/10 font-semibold",
                  )}
                >
                  <div className="flex items-center gap-3 ">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  {isMenuOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-3 text-base leading-[150%] tracking-[0%] font-semibold transition-colors",
                    isActive
                      ? "bg-[#005696] text-[#FFFFFF] font-bold"
                      : "text-[#111111] hover:bg-[#005696] hover:text-[#FFFFFF] font-semibold",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )}

              {/* Nested Items */}
              {hasSubItems && isMenuOpen && (
                <div className="ml-3 bg-[#005696]/3 rounded-lg space-y-1">
                  {item.subItems?.map((subItem) => {
                    if (subItem.isGroup) {
                      const isGroupOpen = openGroups.includes(subItem.name);
                      return (
                        <div
                          key={subItem.name}
                          className="mt-6 mb-4 first:mt-2"
                        >
                          <button
                            onClick={() => toggleGroup(subItem.name)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 mb-2 w-full group/header cursor-pointer rounded-lg transition-all duration-200",
                              isGroupOpen
                                ? "bg-gray-50"
                                : "hover:bg-gray-50/50",
                            )}
                          >
                            <div className="h-px flex-1 bg-gray-100 group-hover/header:bg-gray-200 transition-colors" />
                            <div className="flex items-center gap-2 px-1 text-3xl">
                              {subItem.name === "Home" && (
                                <Home
                                  className={cn(
                                    "h-4 w-4 transition-colors ",
                                    isGroupOpen
                                      ? "text-[#005696]"
                                      : "text-gray-400 group-hover/header:text-gray-600",
                                  )}
                                />
                              )}
                              {subItem.name === "Service" && (
                                <LayoutGrid
                                  className={cn(
                                    "h-4 w-4 transition-colors ",
                                    isGroupOpen
                                      ? "text-[#005696]"
                                      : "text-gray-400 group-hover/header:text-gray-600",
                                  )}
                                />
                              )}
                              {subItem.name === "About" && (
                                <Users
                                  className={cn(
                                    "h-4 w-4 transition-colors ",
                                    isGroupOpen
                                      ? "text-[#005696]"
                                      : "text-gray-400 group-hover/header:text-gray-600",
                                  )}
                                />
                              )}
                              <span
                                className={cn(
                                  "text-[15px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
                                  isGroupOpen
                                    ? "text-[#005696]"
                                    : "text-gray-400 group-hover/header:text-gray-600",
                                )}
                              >
                                {subItem.name}
                              </span>
                              {isGroupOpen ? (
                                <ChevronDown
                                  className={cn(
                                    "h-3.5 w-3.5 transition-colors",
                                    isGroupOpen
                                      ? "text-[#005696]"
                                      : "text-gray-400 group-hover/header:text-gray-600",
                                  )}
                                />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover/header:text-gray-600 transition-colors" />
                              )}
                            </div>
                            <div className="h-px flex-1 bg-gray-100 group-hover/header:bg-gray-200 transition-colors" />
                          </button>

                          {isGroupOpen && (
                            <div className="space-y-0.5 relative ml-4 transition-all duration-300">
                              {/* Vertical line connector */}
                              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100 ml-[7px]" />

                              {subItem.items?.map((groupItem) => {
                                const itemPath = groupItem.href.split("?")[0];
                                const itemTab = new URLSearchParams(
                                  groupItem.href.split("?")[1] || "",
                                ).get("tab");
                                const currentTab = searchParams.get("tab");

                                const isItemActive =
                                  pathname === itemPath &&
                                  (!itemTab || itemTab === currentTab);

                                return (
                                  <Link
                                    key={groupItem.name}
                                    href={groupItem.href || "#"}
                                    className={cn(
                                      "group/sub relative flex items-center gap-3 rounded-lg py-2 px-3 text-sm transition-all duration-200 ml-4",
                                      isItemActive
                                        ? "text-[#005696] font-bold bg-[#005696]/5"
                                        : "text-gray-500 hover:text-[#005696] hover:bg-gray-50",
                                    )}
                                  >
                                    {/* Dot connector */}
                                    <div
                                      className={cn(
                                        "absolute -left-[13px] w-1.5 h-1.5 rounded-full border border-white transition-colors duration-200 z-10",
                                        isItemActive
                                          ? "bg-[#005696]"
                                          : "bg-gray-200 group-hover/sub:bg-gray-400",
                                      )}
                                    />

                                    <span className="truncate">
                                      {groupItem.name}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href || "#"}
                        className={cn(
                          "block rounded-lg p-2 text-sm font-medium transition-colors my-2 mx-1",
                          isSubActive
                            ? "text-[#005696] font-bold bg-[#005696]/5 border-l-2 border-[#005696] rounded-l-none"
                            : "text-gray-500 hover:text-[#005696] hover:bg-gray-50",
                        )}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 cursor-pointer rounded-lg font-medium text-[#e5102e] hover:bg-[#feecee] hover:text-[#e5102e] transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
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
  );
}
