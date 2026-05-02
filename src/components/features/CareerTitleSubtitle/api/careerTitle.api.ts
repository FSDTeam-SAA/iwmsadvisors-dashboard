// src/components/features/CareerTitleSubtitle/api/careerTitle.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import {
  CareerTitleResponse,
  SingleCareerTitleResponse,
  CreateCareerTitleDTO,
} from "../types/careerTitle.types";

/**
 * Get all career titles
 */
export const getAllCareerTitles = async (): Promise<CareerTitleResponse> => {
  const response = await axiosInstance.get("/career-title/all");
  return response.data;
};

/**
 * Get single career title by ID
 */
export const getCareerTitleById = async (id: string): Promise<SingleCareerTitleResponse> => {
  const response = await axiosInstance.get(`/career-title/${id}`);
  return response.data;
};

/**
 * Create new career title
 */
export const createCareerTitle = async (data: CreateCareerTitleDTO): Promise<SingleCareerTitleResponse> => {
  const response = await axiosInstance.post("/career-title/create", data);
  return response.data;
};

/**
 * Update career title
 */
export const updateCareerTitle = async (
  id: string,
  data: Partial<CreateCareerTitleDTO>
): Promise<SingleCareerTitleResponse> => {
  const response = await axiosInstance.patch(`/career-title/${id}`, data);
  return response.data;
};

/**
 * Delete career title
 */
export const deleteCareerTitle = async (id: string): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/career-title/${id}`);
  return response.data;
};
