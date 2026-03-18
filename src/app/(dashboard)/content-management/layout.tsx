import ContentManagementNav from "@/components/features/contentManagement/ContentManagementNav";
import React from "react";

export default function ContentManagementLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <ContentManagementNav />
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
