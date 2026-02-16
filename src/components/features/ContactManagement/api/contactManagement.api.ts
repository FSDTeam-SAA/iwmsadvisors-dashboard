// src/components/features/ContactManagement/api/contactManagement.api.ts
import axiosInstance from "@/lib/instance/axios-instance";
import { ContactManagementResponse } from "../types/contactManagement.types";

// Get Contact Us & Top Performing Services Data
export const getContactManagementApi =
  async (page: number, limit: number): Promise<ContactManagementResponse> => {
    const response = await axiosInstance.get(`/contact?page=${page}&limit=${limit}`);
    return response.data;
  };
