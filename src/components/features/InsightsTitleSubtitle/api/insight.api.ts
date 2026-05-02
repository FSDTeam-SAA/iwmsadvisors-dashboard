// src/components/features/InsightsTitleSubtitle/api/insight.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import {
  InsightResponse,
  SingleInsightResponse,
  CreateInsightDTO,
} from "../types/insight.types";

/**
 * Get all insights
 */
export const getAllInsights = async (): Promise<InsightResponse> => {
  const response = await axiosInstance.get("/insight/all");
  return response.data;
};

/**
 * Get single insight by ID
 */
export const getInsightById = async (id: string): Promise<SingleInsightResponse> => {
  const response = await axiosInstance.get(`/insight/${id}`);
  return response.data;
};

/**
 * Create new insight
 */
export const createInsight = async (data: CreateInsightDTO): Promise<SingleInsightResponse> => {
  const response = await axiosInstance.post("/insight/create", data);
  return response.data;
};

/**
 * Update insight
 */
export const updateInsight = async (
  id: string,
  data: Partial<CreateInsightDTO>
): Promise<SingleInsightResponse> => {
  const response = await axiosInstance.patch(`/insight/${id}`, data);
  return response.data;
};

/**
 * Delete insight
 */
export const deleteInsight = async (id: string): Promise<{ status: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/insight/${id}`);
  return response.data;
};
