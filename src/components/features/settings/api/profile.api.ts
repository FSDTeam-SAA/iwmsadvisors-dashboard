// src/components/features/settings/api/profile.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import {
  ProfileResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  AvatarUploadResponse,
} from "../types/profile.types";

/**
 * Get current user profile
 */
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosInstance.get(`/user/me`);
  return response.data;
};

/**
 * Update current user profile
 */
export const updateProfile = async (
  data: UpdateProfileRequest,
): Promise<ProfileResponse> => {
  const response = await axiosInstance.put(`/user/me`, data);
  return response.data;
};

/**
 * Upload profile avatar
 */
export const uploadAvatar = async (
  file: File,
): Promise<AvatarUploadResponse> => {
  const formData = new FormData();
  formData.append("profileImage", file);
  const response = await axiosInstance.put(`/user/upload-avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Change current user password
 */
export const changePassword = async (
  data: ChangePasswordRequest,
): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.post(`/auth/change-password`, data);
  return response.data;
};
