// src/components/features/settings/component/SettingsContainer.tsx

"use client";

import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import { cn } from "@/lib/utils";
import { User, ShieldCheck } from "lucide-react";

type Tab = "personal" | "password";

export default function SettingsContainer() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-extrabold text-[#111111]">Settings</h1>
        <p className="text-gray-500">Manage your profile information and security settings.</p>
      </div>

      {/* Custom Tabs */}
      <div className="flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-xl w-fit border border-gray-200">
        <button
          onClick={() => setActiveTab("personal")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer",
            activeTab === "personal"
              ? "bg-white text-primary shadow-sm border border-gray-200"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          <User className="h-4 w-4" />
          Personal Information
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer",
            activeTab === "password"
              ? "bg-white text-primary shadow-sm border border-gray-200"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          <ShieldCheck className="h-4 w-4" />
          Change Password
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "personal" ? <PersonalInformation /> : <ChangePassword />}
      </div>
    </div>
  );
}
