// src/components/features/missionVision/api/missionVision.api.ts

import axiosInstance from "@/lib/instance/axios-instance";

// Get all visions
export const getVisions = async () => {
  const response = await axiosInstance.get("/vision/all");
  return response.data;
};

// Get mission
export const getMission = async () => {
  const response = await axiosInstance.get("/mission/all");
  return response.data;
};

// Create vision (with image upload via FormData)
export const createVision = async (data: {
  title: string;
  description: string;
  image?: File;
}) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.image) {
    formData.append("image", data.image);
  }
  const response = await axiosInstance.post("/vision/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update vision (with optional image)
export const updateVision = async (
  id: string,
  data: { title?: string; description?: string; image?: File },
) => {
  const formData = new FormData();
  if (data.title !== undefined) formData.append("title", data.title);
  if (data.description !== undefined)
    formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);
  const response = await axiosInstance.patch(`/vision/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete vision
export const deleteVision = async (id: string) => {
  const response = await axiosInstance.delete(`/vision/${id}`);
  return response.data;
};

// Create mission (with image upload via FormData)
export const createMission = async (data: {
  title: string;
  description: string;
  image?: File;
}) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.image) {
    formData.append("image", data.image);
  }
  const response = await axiosInstance.post("/mission/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update mission (with optional image)
export const updateMission = async (
  id: string,
  data: { title?: string; description?: string; image?: File },
) => {
  const formData = new FormData();
  if (data.title !== undefined) formData.append("title", data.title);
  if (data.description !== undefined)
    formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);
  const response = await axiosInstance.patch(`/mission/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete mission
export const deleteMission = async (id: string) => {
  const response = await axiosInstance.delete(`/mission/${id}`);
  return response.data;
};
