// src/components/features/careerManagement/types/career.types.ts

export type CareerType = "full time" | "part-time" | "contract";

export interface Career {
  _id: string;
  title: string;
  role?: string;
  department: string;
  location: string;
  type: CareerType[];
  description: string;
  requirements: string;
  responsibilities: string;
  isActive: boolean;
  multiplePosition: boolean;
  isMultipleRoles?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CareerResponse {
  success: boolean;
  message: string;
  data: Career[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleCareerResponse {
  success: boolean;
  message: string;
  data: Career;
}

export type ApplicationStatus = "pending" | "shortlisted" | "rejected";

export interface CareerApplication {
  _id: string;
  careerId: Career | string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
  };
  name: string;
  email: string;
  phone: string;
  resumeFile?: {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url?: string;
    path?: string;
  };
  resumeLink?: string;
  portfolioLink?: string;
  coverLetter?: string;
  notes?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CareerApplicationResponse {
  success: boolean;
  message: string;
  data: CareerApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleCareerApplicationResponse {
  success: boolean;
  message: string;
  data: CareerApplication;
}
