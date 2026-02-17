import axiosInstance from "@/lib/instance/axios-instance";
import {
  CreateFaqSectionData,
  FaqResponse,
  FaqSection,
} from "../types/faqSection.types";

export const faqSectionApi = {
  getAllFaqSections: async (): Promise<FaqResponse> => {
    const response = await axiosInstance.get("/faq");
    return response.data;
  },

  getFaqSectionById: async (id: string): Promise<FaqSection> => {
    const response = await axiosInstance.get(`/faq/${id}`);
    return response.data;
  },

  createFaqSection: async (data: CreateFaqSectionData): Promise<FaqSection> => {
    const response = await axiosInstance.post("/faq", data);
    return response.data;
  },

  updateFaqSection: async (
    id: string,
    data: Partial<FaqSection>,
  ): Promise<FaqSection> => {
    const response = await axiosInstance.put(`/faq/${id}`, data);
    return response.data;
  },

  deleteFaqSection: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/faq/${id}`);
  },
};
