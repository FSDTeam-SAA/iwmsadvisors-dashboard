// src/components/features/CaseStudy/api/casestudy.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { CaseStudy } from "../types/casestudy.types";

// get all case studies
export const casestudyApi = {
  getAllCaseStudies: async () => {
    const response = await axiosInstance.get("/case-study");
    return response.data;
  },

  updateCaseStudy: async (id: string, data: Partial<CaseStudy>) => {
    const response = await axiosInstance.put(`/case-study/${id}`, data);
    return response.data;
  },

  deleteCaseStudy: async (id: string) => {
    const response = await axiosInstance.delete(`/case-study/${id}`);
    return response.data;
  },

  createCaseStudy: async (
    data: Omit<CaseStudy, "_id" | "createdAt" | "updatedAt" | "__v">,
  ) => {
    const response = await axiosInstance.post("/case-study", data);
    return response.data;
  },
};
