import {
  BannerSection,
  BannerSectionResponse,
} from "../types/bannerSection.type";
import axiosInstance from "@/lib/instance/axios-instance";

// Get all banner sections
export const getBannerSections = async (): Promise<BannerSectionResponse> => {
  const response = await axiosInstance.get(`/banner/all`);
  return response.data;
};

// Create a new banner section
export const createBannerSection = async (data: {
  title: string;
  subTitle?: string;
  btn1?: string;
  btn2?: string;
  imageFile?: File;
}): Promise<BannerSection> => {
  const formData = new FormData();
  formData.append("title", data.title || "");
  formData.append("subTitle", data.subTitle || "");
  formData.append("btn1", data.btn1 || "");
  formData.append("btn2", data.btn2 || "");
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  const response = await axiosInstance.post("/banner/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

// Update an existing banner section
export const updateBannerSection = async (
  id: string,
  data: Partial<BannerSection> & { imageFile?: File },
): Promise<BannerSection> => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.subTitle) formData.append("subTitle", data.subTitle);
  if (data.btn1) formData.append("btn1", data.btn1);
  if (data.btn2) formData.append("btn2", data.btn2);
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  const response = await axiosInstance.patch(`/banner/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

// Delete a banner section
export const deleteBannerSection = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/banner/${id}`);
};
