import axiosInstance from "@/lib/instance/axios-instance";
import {
  StrengthSectionResponse,
  StrengthItemsResponse,
  StrengthItemResponse,
  BaseResponse,
} from "../types/strengthSection.type";

export const strengthSectionApi = {
  // Main Strength Section
  getStrengthSection: async (): Promise<StrengthSectionResponse> => {
    const response = await axiosInstance.get("/strength/all");
    return response.data;
  },

  createStrengthSection: async (data: {
    title: string;
    subtitle: string;
  }): Promise<StrengthSectionResponse> => {
    const response = await axiosInstance.post("/strength/create", data);
    return response.data;
  },

  updateStrengthSection: async (
    id: string,
    data: { title?: string; subtitle?: string },
  ): Promise<StrengthSectionResponse> => {
    const response = await axiosInstance.patch(`/strength/${id}`, data);
    return response.data;
  },

  deleteStrengthSection: async (id: string): Promise<BaseResponse> => {
    const response = await axiosInstance.delete(`/strength/${id}`);
    return response.data;
  },

  // Strength Items
  getAllStrengthItems: async (): Promise<StrengthItemsResponse> => {
    const response = await axiosInstance.get("/items/all");
    return response.data;
  },

  createStrengthItem: async (data: {
    title: string;
    subtitle: string;
    image: File;
  }): Promise<StrengthItemResponse> => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("image", data.image);

    const response = await axiosInstance.post("/items/create", formData);
    return response.data;
  },

  updateStrengthItem: async (
    id: string,
    data: { title?: string; subtitle?: string; image?: File },
  ): Promise<StrengthItemResponse> => {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.subtitle) formData.append("subtitle", data.subtitle);
    if (data.image) formData.append("image", data.image);

    const response = await axiosInstance.patch(`/items/${id}`, formData);
    return response.data;
  },

  deleteStrengthItem: async (id: string): Promise<BaseResponse> => {
    const response = await axiosInstance.delete(`/items/${id}`);
    return response.data;
  },
};
