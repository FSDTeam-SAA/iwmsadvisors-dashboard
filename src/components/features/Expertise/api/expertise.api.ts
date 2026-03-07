import axiosInstance from "@/lib/instance/axios-instance";
import {
  ExpertiseCreateInput,
  ExpertiseUpdateInput,
  ExpertiseListResponse,
  ExpertiseResponse,
} from "../types/expertise.type";

// Get all expertises
export const getExpertises = async (): Promise<ExpertiseListResponse> => {
  const response = await axiosInstance.get("/expertise/all");
  return response.data;
};

// Create expertise
export const createExpertise = async (
  data: ExpertiseCreateInput,
): Promise<ExpertiseResponse> => {
  const response = await axiosInstance.post("/expertise/create", data);
  return response.data;
};

// Update expertise
export const updateExpertise = async (
  id: string,
  data: ExpertiseUpdateInput,
): Promise<ExpertiseResponse> => {
  const response = await axiosInstance.patch(`/expertise/${id}`, data);
  return response.data;
};

// Delete expertise
export const deleteExpertise = async (
  id: string,
): Promise<ExpertiseResponse> => {
  const response = await axiosInstance.delete(`/expertise/${id}`);
  return response.data;
};
