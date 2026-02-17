// src/components/features/blogSection/api/blogSection.api.ts

import { BlogSection, BlogSectionResponse } from "../types/blogsection.types";
import axiosInstance from "@/lib/instance/axios-instance";

// Get all blog sections
export const getBlogSections = async (
  page = 1,
  limit = 10,
): Promise<BlogSectionResponse> => {
  const response = await axiosInstance.get(
    `/blog?page=${page}&limit=${limit}`,
  );
  return response.data;
};

// Get single blog section by ID
export const getBlogSectionById = async (id: string): Promise<BlogSection> => {
  const response = await axiosInstance.get(`/blog/${id}`);
  return response.data;
};

// Create new blog section
export const createBlogSection = async (
  data: Partial<BlogSection> & { imageFile?: File },
): Promise<BlogSection> => {
  const formData = new FormData();
  formData.append("title", data.title || "");
  formData.append("subtitle", data.subtitle || "");
  formData.append("description", data.description || "");
  if (data.imageFile) {
    formData.append("file", data.imageFile);
  }

  const response = await axiosInstance.post(`/blog`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update blog section
export const updateBlogSection = async (
  id: string,
  data: Partial<BlogSection> & { imageFile?: File },
): Promise<BlogSection> => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.description) formData.append("description", data.description);
  if (data.imageFile) {
    formData.append("file", data.imageFile);
  }

  const response = await axiosInstance.put(`/blog/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete blog section
export const deleteBlogSection = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/blog/${id}`);
};
