// src/components/features/aboutSection/api/aboutSection.api.ts

import {
  AboutSection,
  AboutSectionResponse,
  AboutSectionsResponse,
  BaseResponse,
} from "../types/aboutSection.type";
import axiosInstance from "@/lib/instance/axios-instance";

// Get all about sections
export const getAboutSections = async (): Promise<AboutSectionsResponse> => {
  try {
    const response = await axiosInstance.get(`/about/get`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { status: number } };
    if (axiosError.response?.status === 404) {
      return {
        status: true, // Set to true so UI doesn't show error block
        message: "About sections not found",
        data: [],
      };
    }
    throw error;
  }
};

// Create a new about section
export const createAboutSection = async (data: {
  title: string;
  subtitle: string;
  descriptionTitle: string;
  description: string;
  btnName: string;
  imageFile?: File;
}): Promise<AboutSectionResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("subtitle", data.subtitle);
  formData.append("descriptionTitle", data.descriptionTitle);
  formData.append("description", data.description);
  formData.append("btnName", data.btnName);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  const response = await axiosInstance.post("/about/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update an about section
export const updateAboutSection = async (
  id: string,
  data: Partial<AboutSection> & { imageFile?: File },
): Promise<AboutSectionResponse> => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.descriptionTitle)
    formData.append("descriptionTitle", data.descriptionTitle);
  if (data.description) formData.append("description", data.description);
  if (data.btnName) formData.append("btnName", data.btnName);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  const response = await axiosInstance.patch(`/about/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete an about section
export const deleteAboutSection = async (id: string): Promise<BaseResponse> => {
  const response = await axiosInstance.delete(`/about/delete/${id}`);
  return response.data;
};
