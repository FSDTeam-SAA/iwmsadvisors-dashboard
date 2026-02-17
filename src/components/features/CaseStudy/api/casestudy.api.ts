// src/components/features/CaseStudy/api/casestudy.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { CaseStudy } from "../types/casestudy.types";

// get all case studies
export const casestudyApi = {
  getAllCaseStudies: async () => {
    const response = await axiosInstance.get("/case-study");
    return response.data;
  },

  updateCaseStudy: async (
    id: string,
    data: (Partial<CaseStudy> & { imageFile?: File }) | FormData,
  ) => {
    if (data instanceof FormData) {
      const response = await axiosInstance.put(`/case-study/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }

    if ("imageFile" in data && data.imageFile) {
      const formData = new FormData();
      formData.append("title", data.title ?? "");
      formData.append("subtitle", data.subtitle ?? "");
      formData.append("description", data.description ?? "");
      formData.append("client", data.client ?? "");
      formData.append("duration", data.duration ?? "");
      formData.append("teamSize", data.teamSize ?? "");
      formData.append("challenge", data.challenge ?? "");
      formData.append("solution", data.solution ?? "");
      if (data.technologiesUsed) {
        formData.append(
          "technologiesUsed",
          JSON.stringify(data.technologiesUsed),
        );
      }
      formData.append("resultImpact", data.resultImpact ?? "");
      formData.append("caseExperience", data.caseExperience ?? "");
      formData.append("clientName", data.clientName ?? "");
      formData.append("companyName", data.companyName ?? "");
      formData.append("image", data.imageFile);

      const response = await axiosInstance.put(
        `/case-study/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    }

    const response = await axiosInstance.put(`/case-study/${id}`, data);
    return response.data;
  },

  deleteCaseStudy: async (id: string) => {
    const response = await axiosInstance.delete(`/case-study/${id}`);
    return response.data;
  },

  createCaseStudy: async (
    data:
      | (Omit<CaseStudy, "_id" | "createdAt" | "updatedAt" | "__v"> & {
          imageFile?: File;
        })
      | FormData,
  ) => {
    if (data instanceof FormData) {
      const response = await axiosInstance.post("/case-study", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }

    if ("imageFile" in data && data.imageFile) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle ?? "");
      formData.append("description", data.description);
      formData.append("client", data.client ?? "");
      formData.append("duration", data.duration ?? "");
      formData.append("teamSize", data.teamSize ?? "");
      formData.append("challenge", data.challenge ?? "");
      formData.append("solution", data.solution ?? "");
      formData.append(
        "technologiesUsed",
        JSON.stringify(data.technologiesUsed ?? []),
      );
      formData.append("resultImpact", data.resultImpact ?? "");
      formData.append("caseExperience", data.caseExperience ?? "");
      formData.append("clientName", data.clientName ?? "");
      formData.append("companyName", data.companyName ?? "");
      formData.append("image", data.imageFile);

      const response = await axiosInstance.post("/case-study", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }

    const response = await axiosInstance.post("/case-study", data);
    return response.data;
  },
};
