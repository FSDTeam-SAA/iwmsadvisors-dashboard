// src/components/features/heroSection/api/heroSection.api.ts
import {
  HeroSectionResponse,
  HeroSectionsResponse,
  BaseResponse,
} from "../types/heroSection.type";
import axiosInstance from "@/lib/instance/axios-instance";

// Get all hero sections
export const getHeroSections = async (): Promise<HeroSectionsResponse> => {
  try {
    const response = await axiosInstance.get(`/hero/all`);

    // Normalize to array format if object returned
    if (response.data?.data && !Array.isArray(response.data.data)) {
      response.data.data = [response.data.data];
    }

    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { status: number } };
    if (axiosError.response?.status === 404) {
      return {
        status: true,
        message: "Hero sections not found",
        data: [],
      };
    }
    throw error;
  }
};

// Create a new hero section
export const createHeroSection = async (data: {
  order: number;
  title: string;
  subtitle?: string;
  image?: File;
}): Promise<HeroSectionResponse> => {
  const formData = new FormData();
  formData.append("order", data.order.toString());
  formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.image) formData.append("image", data.image);

  const response = await axiosInstance.post(`/hero/create`, formData);
  return response.data;
};

// Update an existing hero section
export const updateHeroSection = async (
  id: string,
  data: {
    title?: string;
    subtitle?: string;
    image?: File;
  },
): Promise<HeroSectionResponse> => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.image) formData.append("image", data.image);

  const response = await axiosInstance.patch(`/hero/${id}`, formData);
  return response.data;
};

// Delete a hero section
export const deleteHeroSection = async (id: string): Promise<BaseResponse> => {
  const response = await axiosInstance.delete(`/hero/${id}`);
  return response.data;
};
