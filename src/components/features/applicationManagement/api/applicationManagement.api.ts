import axiosInstance from "@/lib/instance/axios-instance";
import { ApplicationResponse } from "../types/applicationManagement.type";

export const applicationApi = {
  getAllApplications: async (): Promise<ApplicationResponse> => {
    const { data } = await axiosInstance.get("/application/all");
    return data;
  },

  deleteApplication: async (id: string): Promise<void> => {
    const { data } = await axiosInstance.delete(`/application/${id}`);
    return data;
  },
};
