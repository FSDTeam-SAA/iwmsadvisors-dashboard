// src/components/features/contactInformationSection/api/contactInformation.api.ts

import {
  ContactInformation,
  ContactInformationResponse,
} from "../types/contactInformation.type";
import axiosInstance from "@/lib/instance/axios-instance";

// Get contact information
export const getContactInformation =
  async (): Promise<ContactInformationResponse> => {
    try {
      const response = await axiosInstance.get(`/information/get`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError.response?.status === 404) {
        return {
          status: true, // Success-like empty state
          message: "Contact information not found",
          data: null as unknown as ContactInformation,
        };
      }
      throw error;
    }
  };

// Create contact information
export const createContactInformation = async (data: {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  mapUrl: string;
}): Promise<ContactInformationResponse> => {
  const response = await axiosInstance.post("/information/create", data);
  return response.data;
};

// Update contact information
export const updateContactInformation = async (
  data: Partial<ContactInformation>,
): Promise<ContactInformationResponse> => {
  const response = await axiosInstance.patch(`/information/update`, data);
  return response.data;
};

// Delete contact information
export const deleteContactInformation = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/information/delete/${id}`);
};
