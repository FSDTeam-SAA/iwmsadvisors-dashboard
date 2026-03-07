// src/components/features/footerSection/api/footer.api.ts

import {
  Footer,
  FooterResponse,
  FooterCreateRequest,
  FooterUpdateRequest,
} from "../types/footer.type";
import axiosInstance from "@/lib/instance/axios-instance";

// Get footer
export const getFooter = async (): Promise<FooterResponse> => {
  try {
    const response = await axiosInstance.get("/footer/get");
    return response.data;
  } catch (error: unknown) {
    // If the API returns 404 "Footer not found", we treat it as a valid empty state
    const axiosError = error as { response?: { status: number } };
    if (axiosError.response?.status === 404) {
      return {
        status: true, // Success-like empty state
        message: "Footer not found",
        data: null as unknown as Footer,
      };
    }
    throw error;
  }
};

// Create footer
export const createFooter = async (
  data: FooterCreateRequest,
): Promise<FooterResponse> => {
  const formData = new FormData();
  if (data.logoFile) formData.append("logo", data.logoFile);
  formData.append("description", data.description);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("copyright", data.copyright);
  formData.append("quickLinks", JSON.stringify(data.quickLinks));
  formData.append("consultingLinks", JSON.stringify(data.consultingLinks));
  formData.append("contactLinks", JSON.stringify(data.contactLinks));
  formData.append("socialLinks", JSON.stringify(data.socialLinks));

  const response = await axiosInstance.post("/footer/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update footer
export const updateFooter = async ({
  id,
  data,
}: {
  id: string;
  data: FooterUpdateRequest;
}): Promise<FooterResponse> => {
  const formData = new FormData();
  if (data.logoFile) formData.append("logo", data.logoFile);
  if (data.description !== undefined)
    formData.append("description", data.description);
  if (data.email !== undefined) formData.append("email", data.email);
  if (data.phone !== undefined) formData.append("phone", data.phone);
  if (data.copyright !== undefined)
    formData.append("copyright", data.copyright);
  if (data.quickLinks !== undefined)
    formData.append("quickLinks", JSON.stringify(data.quickLinks));
  if (data.consultingLinks !== undefined)
    formData.append("consultingLinks", JSON.stringify(data.consultingLinks));
  if (data.contactLinks !== undefined)
    formData.append("contactLinks", JSON.stringify(data.contactLinks));
  if (data.socialLinks !== undefined)
    formData.append("socialLinks", JSON.stringify(data.socialLinks));

  const response = await axiosInstance.patch(`/footer/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete footer
export const deleteFooter = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/footer/delete/${id}`);
};
