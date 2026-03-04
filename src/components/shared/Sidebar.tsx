"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const navigation = [
  { name: "Dashboard Overview", href: "/", icon: LayoutDashboard },

  { name: "Contact Management", href: "/contact-management", icon: UsersRound },
  {
    name: "Content Management",
    href: "/content-management",
    icon: TvMinimalPlay,
    subItems: [
      { name: "Case Study", href: "/content-management/case-study" },
      { name: "MREF Section", href: "/content-management/mref-section" },
      { name: "FAQ Section", href: "/content-management/faq-section" },
      { name: "Blog Section", href: "/content-management/blog-section" },
      { name: "Banner Section", href: "/content-management/banner-section" },
      { name: "About Section", href: "/content-management/about-section" },
    ],
  },
  {
    name: "Service Management",
    href: "/service-management",
    icon: ShoppingBasket,
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
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Content Management"]); // Default open for Content Management

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const handleLogout = () => {
    // NextAuth signOut with redirect to login page
    signOut({ callbackUrl: "/login" });
    setOpen(false);
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
                  <div className="flex items-center gap-3">
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
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "block rounded-lg p-2 text-sm font-medium transition-colors my-3",
                          isSubActive
                            ? "text-[#005696] font-bold bg-[#005696]/5"
                            : "text-gray-500 hover:text-[#005696] hover:bg-[#005696]/5",
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
