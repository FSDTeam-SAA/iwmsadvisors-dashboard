// src/components/features/ServiceTitleSubtitle/api/service.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import {
  ServiceTitleResponse,
  SingleServiceTitleResponse,
  CreateServiceTitleDTO,
} from "../types/service.types";

/**
 * Get all service titles
 */
export const getAllServiceTitles = async (): Promise<ServiceTitleResponse> => {
  const response = await axiosInstance.get("/service/all");
  return response.data;
};

/**
 * Get single service title by ID
 */
export const getServiceTitleById = async (id: string): Promise<SingleServiceTitleResponse> => {
  const response = await axiosInstance.get(`/service/${id}`);
  return response.data;
};

/**
 * Create new service title
 */
export const createServiceTitle = async (data: CreateServiceTitleDTO): Promise<SingleServiceTitleResponse> => {
  const response = await axiosInstance.post("/service/create", data);
  return response.data;
};

/**
 * Update service title
 */
export const updateServiceTitle = async (
  id: string,
  data: Partial<CreateServiceTitleDTO>
): Promise<SingleServiceTitleResponse> => {
  const response = await axiosInstance.patch(`/service/${id}`, data);
  return response.data;
};

/**
 * Delete service title
 */
export const deleteServiceTitle = async (id: string): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/service/${id}`);
  return response.data;
};
