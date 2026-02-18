// src/app/(dashboard)/settings/page.tsx

import SettingsContainer from "@/components/features/settings/component/SettingsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | IWMS Advisor",
  description: "Manage your account settings and profile information.",
};

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8">
      <SettingsContainer />
    </div>
  );
}
