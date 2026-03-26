// src/components/features/contactServices/api/contactServices.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import {
  ContactServicesResponse,
  CreateTitleRequest,
  UpdateTitleRequest,
  BaseResponse,
} from "../types/contactServices.type";

export const contactServicesApi = {
  getAllTitles: async (): Promise<ContactServicesResponse> => {
    const response = await axiosInstance.get("/service-page-title");
    return response.data;
  },

  createTitle: async (data: CreateTitleRequest): Promise<BaseResponse> => {
    const response = await axiosInstance.post("/service-page-title", data);
    return response.data;
  },

  updateTitle: async (
    id: string,
    data: UpdateTitleRequest,
  ): Promise<BaseResponse> => {
    const response = await axiosInstance.patch(`/service-page-title/${id}`, data);
    return response.data;
  },

  deleteTitle: async (id: string): Promise<BaseResponse> => {
    const response = await axiosInstance.delete(`/service-page-title/${id}`);
    return response.data;
  },
};
