"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import HeaderTitle from "../Dashboard/ReusableComponents/HeaderTitle";

export default function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
    setLogoutDialogOpen(false);
  };

  const getUserInitials = (firstName?: string, lastName?: string) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}` || "U";
  };

  const getDisplayName = (firstName?: string, lastName?: string) => {
    const firstPart = firstName ? firstName.split(" ")[0] : "";
    const lastPart = lastName ? lastName.split(" ").slice(-1)[0] : "";
    return `${firstPart} ${lastPart}`.trim() || session?.user?.email || "User";
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-between w-full h-[100px] px-4 py-3 bg-white shadow-sm border-b">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <Skeleton className="h-4 w-[100px] mb-1" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <header className="w-full h-[100px] bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md border hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <HeaderTitle
          title="Dashboard Overview"
          subtitle="See your updates today!"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">
              {getDisplayName(user.firstName, user.lastName)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{user.email}</p>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-10 w-10 border border-gray-200">
              <AvatarImage
                src={user?.image || "/avatar.png"}
                alt="User Avatar"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {getUserInitials(user?.firstName, user?.lastName)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
