import axiosInstance from "@/lib/instance/axios-instance";
import {
  ConsultantResponse,
  ConsultantFormData,
} from "../types/consultant.type";

export const consultantApi = {
  createConsultant: async (data: ConsultantFormData): Promise<void> => {
    const response = await axiosInstance.post("/consultant/create", data);
    return response.data;
  },

  getAllConsultants: async (): Promise<ConsultantResponse> => {
    const response = await axiosInstance.get("/consultant/all");
    return response.data;
  },

  updateConsultant: async (
    id: string,
    data: Partial<ConsultantFormData>,
  ): Promise<void> => {
    const response = await axiosInstance.patch(`/consultant/${id}`, data);
    return response.data;
  },

  deleteConsultant: async (id: string): Promise<void> => {
    const response = await axiosInstance.delete(`/consultant/${id}`);
    return response.data;
  },
};
