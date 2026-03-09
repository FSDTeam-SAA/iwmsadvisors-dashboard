import axiosInstance from "@/lib/instance/axios-instance";
import {
  StatsSectionResponse,
  StatsSectionFormData,
} from "../types/statsSection.type";

export const statsSectionApi = {
  createStatsSection: async (data: StatsSectionFormData): Promise<void> => {
    const response = await axiosInstance.post("/stats/create", data);
    return response.data;
  },

  getAllStatsSections: async (): Promise<StatsSectionResponse> => {
    const response = await axiosInstance.get("/stats/all");
    return response.data;
  },

  updateStatsSection: async (
    id: string,
    data: Partial<StatsSectionFormData>,
  ): Promise<void> => {
    const response = await axiosInstance.patch(`/stats/${id}`, data);
    return response.data;
  },

  deleteStatsSection: async (id: string): Promise<void> => {
    const response = await axiosInstance.delete(`/stats/${id}`);
    return response.data;
  },
};
