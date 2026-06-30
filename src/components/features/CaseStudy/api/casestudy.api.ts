// src/components/features/CaseStudy/api/casestudy.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { CaseStudy } from "../types/casestudy.types";

const formFields = [
  "title",
  "subtitle",
  "description",
  "customer",
  "challenge",
  "solution",
  "benefit",
] as const;

const appendCaseStudyFields = (
  formData: FormData,
  data: Partial<CaseStudy>,
) => {
  formFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      formData.append(field, String(data[field] ?? ""));
    }
  });
};

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
      appendCaseStudyFields(formData, data);
      formData.append("file", data.imageFile);

      const response = await axiosInstance.put(`/case-study/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      appendCaseStudyFields(formData, data);
      formData.append("file", data.imageFile);

      const response = await axiosInstance.post("/case-study", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }

    const response = await axiosInstance.post("/case-study", data);
    return response.data;
  },
};
