// src/components/features/SubscriberTitleSubtitle/api/subscriber.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import {
  SubscriberTitleResponse,
  SingleSubscriberTitleResponse,
  CreateSubscriberTitleDTO,
} from "../types/subscriber.types";

/**
 * Get all subscriber titles
 */
export const getAllSubscriberTitles = async (): Promise<SubscriberTitleResponse> => {
  const response = await axiosInstance.get("/subscriber/all");
  return response.data;
};

/**
 * Get single subscriber title by ID
 */
export const getSubscriberTitleById = async (id: string): Promise<SingleSubscriberTitleResponse> => {
  const response = await axiosInstance.get(`/subscriber/${id}`);
  return response.data;
};

/**
 * Create new subscriber title
 */
export const createSubscriberTitle = async (data: CreateSubscriberTitleDTO): Promise<SingleSubscriberTitleResponse> => {
  const response = await axiosInstance.post("/subscriber/create", data);
  return response.data;
};

/**
 * Update subscriber title
 */
export const updateSubscriberTitle = async (
  id: string,
  data: Partial<CreateSubscriberTitleDTO>
): Promise<SingleSubscriberTitleResponse> => {
  const response = await axiosInstance.patch(`/subscriber/${id}`, data);
  return response.data;
};

/**
 * Delete subscriber title
 */
export const deleteSubscriberTitle = async (id: string): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/subscriber/${id}`);
  return response.data;
};
