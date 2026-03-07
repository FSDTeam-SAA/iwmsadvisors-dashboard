import axiosInstance from "@/lib/instance/axios-instance";
import {
  CertificationCreateInput,
  CertificationUpdateInput,
  CertificationsResponse,
  CertificationResponse,
} from "../types/certifications.type";

// Get all certifications
export const getCertifications = async (): Promise<CertificationsResponse> => {
  const response = await axiosInstance.get("/certifications/all");
  return response.data;
};

// Get single certification
export const getCertificationById = async (
  id: string,
): Promise<CertificationResponse> => {
  const response = await axiosInstance.get(`/certifications/get/${id}`);
  return response.data;
};

// Create certification
export const createCertification = async (
  data: CertificationCreateInput,
): Promise<CertificationResponse> => {
  const response = await axiosInstance.post("/certifications/create", data);
  return response.data;
};

// Update certification
export const updateCertification = async (
  id: string,
  data: CertificationUpdateInput,
): Promise<CertificationResponse> => {
  const response = await axiosInstance.patch(`/certifications/${id}`, data);
  return response.data;
};

// Delete certification
export const deleteCertification = async (
  id: string,
): Promise<CertificationResponse> => {
  const response = await axiosInstance.delete(`/certifications/${id}`);
  return response.data;
};
