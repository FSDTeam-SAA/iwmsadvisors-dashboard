// src/components/features/settings/types/profile.types.ts

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
  profileImage?: string;
  bio?: string;
  phone?: string;
  name?: string;
  fullName?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface AvatarUploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}
