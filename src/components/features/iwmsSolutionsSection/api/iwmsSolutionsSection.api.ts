// src/components/features/iwmsSolutionsSection/api/iwmsSolutionsSection.api.ts

import {
  IwmsSolutionsSectionResponse,
  IwmsSolutionsSectionsResponse,
  BaseResponse,
  IwmsSolutionsSectionPayload,
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
export const createIwmsSolutionsSection = async (
  data: IwmsSolutionsSectionPayload,
): Promise<IwmsSolutionsSectionResponse> => {
  const formData = new FormData();
  if (data.order !== undefined) formData.append("order", data.order.toString());
  if (data.title) formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.items) formData.append("items", JSON.stringify(data.items));

  // Dynamically append all icon_N fields
  Object.keys(data).forEach((key) => {
    if (key.startsWith("icon_") && data[key] instanceof File) {
      formData.append(key, data[key]);
    }
  });

  const response = await axiosInstance.post("/features/create", formData);
  return response.data;
};

// Update a section
export const updateIwmsSolutionsSection = async (
  id: string,
  data: IwmsSolutionsSectionPayload,
): Promise<IwmsSolutionsSectionResponse> => {
  const formData = new FormData();

  if (data.order !== undefined) formData.append("order", data.order.toString());
  if (data.title) formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.items) formData.append("items", JSON.stringify(data.items));

  // Dynamically append all icon_N fields
  Object.keys(data).forEach((key) => {
    if (key.startsWith("icon_") && data[key] instanceof File) {
      formData.append(key, data[key]);
    }
  });

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
