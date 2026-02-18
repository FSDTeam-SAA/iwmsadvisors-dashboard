import axiosInstance from "@/lib/instance/axios-instance";
import {
  ServicePageResponse,
  ServicePage,
} from "../types/service-management.types";

export const serviceManagementApi = {
  getAll: async (page = 1, limit = 10): Promise<ServicePageResponse> => {
    const response = await axiosInstance.get(
      `/service-page?page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  create: async (data: {
    heading: string;
    title: string;
    subtitles: string[];
    guideline: string;
    description: string;
    faq: { question: string; answer: string }[];
    imageFile?: File | null;
  }): Promise<ServicePage> => {
    const formData = new FormData();
    formData.append("heading", data.heading);
    formData.append("title", data.title);

    // Subtitles (array of strings)
    data.subtitles.forEach((subtitle) => {
      formData.append("subtitles[]", subtitle);
    });

    formData.append("guideline", data.guideline);
    formData.append("description", data.description);

    // FAQ (array of objects) - Backend likely expects indexed fields or stringified JSON
    // Assuming stringified JSON based on complex object structure or standard array notation
    // If backend expects specific format, adjust here.
    // Using index notation common in PHP/Node: faq[0][question]
    data.faq.forEach((item, index) => {
      formData.append(`faq[${index}][question]`, item.question);
      formData.append(`faq[${index}][answer]`, item.answer);
    });

    if (data.imageFile) {
      formData.append("file", data.imageFile);
    }

    const response = await axiosInstance.post("/service-page", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<{
      heading: string;
      title: string;
      subtitles: string[];
      guideline: string;
      description: string;
      faq: { question: string; answer: string }[];
      imageFile?: File | null;
    }>,
  ): Promise<ServicePage> => {
    const formData = new FormData();
    if (data.heading) formData.append("heading", data.heading);
    if (data.title) formData.append("title", data.title);

    if (data.subtitles) {
      data.subtitles.forEach((subtitle) => {
        formData.append("subtitles[]", subtitle);
      });
    }

    if (data.guideline) formData.append("guideline", data.guideline);
    if (data.description) formData.append("description", data.description);

    if (data.faq) {
      data.faq.forEach((item, index) => {
        formData.append(`faq[${index}][question]`, item.question);
        formData.append(`faq[${index}][answer]`, item.answer);
      });
    }

    if (data.imageFile) {
      formData.append("file", data.imageFile);
    }

    const response = await axiosInstance.put(`/service-page/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/service-page/${id}`);
  },
};
