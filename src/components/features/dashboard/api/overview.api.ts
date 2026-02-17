// src/components/features/dashboard/api/overview.api.ts
import axiosInstance from "@/lib/instance/axios-instance";

// Get Contact Us & Top Performing Services Data
export const getOverviewApi = async (year: string = "2026") => {
  const response = await axiosInstance.get(
    `/admin-dashboard/contact-stats/services?year=${year}`,
  );
  return response.data;
};
