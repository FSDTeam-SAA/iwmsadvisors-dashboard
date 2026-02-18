// src/app/(dashboard)/career-management/page.tsx

import CareerManagement from "@/components/features/careerManagement/component/CareerManagement";

export const metadata = {
  title: "Career Management | Dashboard",
  description: "Manage job positions and applications.",
};

export default function CareerManagementPage() {
  return <CareerManagement />;
}
