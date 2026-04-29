// src/components/features/careerManagement/api/career.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import {
  Career,
  CareerResponse,
  SingleCareerResponse,
  CareerApplicationResponse,
  SingleCareerApplicationResponse,
  ApplicationStatus,
} from "../types/career.types";

// --- Career Endpoints ---

/**
 * Get all careers with pagination
 */
export const getCareers = async (
  page = 1,
  limit = 10,
  filters: {
    type?: string;
    isActive?: boolean | string;
    multiplePosition?: boolean | string;
  } = {}
): Promise<CareerResponse> => {
  let url = `/career?page=${page}&limit=${limit}`;
  
  if (filters.type) {
    url += `&type=${filters.type}`;
  }
  if (filters.isActive !== undefined && filters.isActive !== "") {
    url += `&isActive=${filters.isActive}`;
  }
  if (filters.multiplePosition !== undefined && filters.multiplePosition !== "") {
    url += `&multiplePosition=${filters.multiplePosition}`;
  }

  const response = await axiosInstance.get(url);
  return response.data;
};

/**
 * Get single career by ID
 */
export const getCareerById = async (id: string): Promise<SingleCareerResponse> => {
  const response = await axiosInstance.get(`/career/${id}`);
  return response.data;
};

/**
 * Create new career
 */
export const createCareer = async (
  data: Partial<Career>,
): Promise<SingleCareerResponse> => {
  const response = await axiosInstance.post(`/career`, data);
  return response.data;
};

/**
 * Update career
 */
export const updateCareer = async (
  id: string,
  data: Partial<Career>,
): Promise<SingleCareerResponse> => {
  const response = await axiosInstance.put(`/career/${id}`, data);
  return response.data;
};

/**
 * Delete career
 */
export const deleteCareer = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/career/${id}`);
  return response.data;
};

// --- Career Application Endpoints ---

/**
 * Get all career applications (Admin)
 */
export const getCareerApplications = async (
  page = 1,
  limit = 10,
  careerId?: string,
): Promise<CareerApplicationResponse> => {
  const url = careerId 
    ? `/career-application?page=${page}&limit=${limit}&careerId=${careerId}`
    : `/career-application?page=${page}&limit=${limit}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

/**
 * Get single career application by ID
 */
export const getCareerApplicationById = async (
  id: string,
): Promise<SingleCareerApplicationResponse> => {
  const response = await axiosInstance.get(`/career-application/${id}`);
  return response.data;
};

/**
 * Update career application status
 */
export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus,
): Promise<SingleCareerApplicationResponse> => {
  const response = await axiosInstance.put(`/career-application/${id}`, {
    status,
  });
  return response.data;
};

/**
 * Delete career application
 */
export const deleteCareerApplication = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/career-application/${id}`);
  return response.data;
};
