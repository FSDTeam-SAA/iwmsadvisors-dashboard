// src/components/features/iwmsSolutionsSection/api/iwmsSolutionsSection.api.ts

import {
  IwmsSolutionsSectionResponse,
  IwmsSolutionsSectionsResponse,
  BaseResponse,
  IwmsSolutionsItem,
} from "../types/iwmsSolutionsSection.type";
import axiosInstance from "@/lib/instance/axios-instance";

// Get all sections
export const getIwmsSolutionsSections =
  async (): Promise<IwmsSolutionsSectionsResponse> => {
    try {
      const response = await axiosInstance.get(`/features/all`);

      // Normalize to array format
      if (response.data?.data && !Array.isArray(response.data.data)) {
        response.data.data = [response.data.data];
      }

      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError.response?.status === 404) {
        return {
          status: true,
          message: "IwmsSolutions sections not found",
          data: [],
        };
      }
      throw error;
    }
  };

// Create a new section
export const createIwmsSolutionsSection = async (data: {
  order: number;
  title: string;
  subtitle: string;
  items: Omit<IwmsSolutionsItem, "icon">[];
  icon_1?: File;
  icon_2?: File;
  icon_3?: File;
  icon_4?: File;
}): Promise<IwmsSolutionsSectionResponse> => {
  const formData = new FormData();
  formData.append("order", data.order.toString());
  formData.append("title", data.title);
  formData.append("subtitle", data.subtitle);

  formData.append("items", JSON.stringify(data.items));

  if (data.icon_1) formData.append("icon_1", data.icon_1);
  if (data.icon_2) formData.append("icon_2", data.icon_2);
  if (data.icon_3) formData.append("icon_3", data.icon_3);
  if (data.icon_4) formData.append("icon_4", data.icon_4);

  const response = await axiosInstance.post("/features/create", formData);
  return response.data;
};

// Update a section
export const updateIwmsSolutionsSection = async (
  id: string,
  data: {
    order?: number;
    title?: string;
    subtitle?: string;
    items?: Omit<IwmsSolutionsItem, "icon">[];
    icon_1?: File;
    icon_2?: File;
    icon_3?: File;
    icon_4?: File;
  },
): Promise<IwmsSolutionsSectionResponse> => {
  const formData = new FormData();

  if (data.order !== undefined) formData.append("order", data.order.toString());
  if (data.title) formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.items) formData.append("items", JSON.stringify(data.items));

  if (data.icon_1) formData.append("icon_1", data.icon_1);
  if (data.icon_2) formData.append("icon_2", data.icon_2);
  if (data.icon_3) formData.append("icon_3", data.icon_3);
  if (data.icon_4) formData.append("icon_4", data.icon_4);

  const response = await axiosInstance.patch(`/features/${id}`, formData);
  return response.data;
};

// Delete a section
export const deleteIwmsSolutionsSection = async (
  id: string,
): Promise<BaseResponse> => {
  const response = await axiosInstance.delete(`/features/${id}`);
  return response.data;
};
