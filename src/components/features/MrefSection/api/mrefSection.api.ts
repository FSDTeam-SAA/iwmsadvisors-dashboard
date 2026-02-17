import axiosInstance from "@/lib/instance/axios-instance";
import {
  CreateMrefSectionData,
  MrefResponse,
  MrefSection,
} from "../types/mrefSection.types";

export const mrefSectionApi = {
  getAll: async (): Promise<MrefResponse> => {
    const response = await axiosInstance.get("/real-state");
    return response.data;
  },

  create: async (data: CreateMrefSectionData) => {
    if (data instanceof FormData) {
      const response = await axiosInstance.post("/real-state", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    if ("imageFile" in data && data.imageFile) {
      const form = new FormData();
      form.append("title", data.title);
      form.append("overview", data.overview ?? "");
      const subtitles = data.subtitles ?? [];
      subtitles.forEach((subtitle) => {
        form.append("subtitles", subtitle);
      });
      form.append(
        "keyCapabilities",
        JSON.stringify(data.keyCapabilities ?? []),
      );
      form.append("image", data.imageFile);
      const response = await axiosInstance.post("/real-state", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await axiosInstance.post("/real-state", data);
    return response.data;
  },

  update: async (
    id: string,
    data: (Partial<MrefSection> & { imageFile?: File }) | FormData,
  ) => {
    if (data instanceof FormData) {
      const response = await axiosInstance.put(`/real-state/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    if ("imageFile" in data && data.imageFile) {
      const form = new FormData();
      if (data.title !== undefined) form.append("title", data.title);
      if (data.overview !== undefined) form.append("overview", data.overview);
      if (data.subtitles) {
        data.subtitles.forEach((subtitle) => {
          form.append("subtitles", subtitle);
        });
      }
      if (data.keyCapabilities)
        form.append("keyCapabilities", JSON.stringify(data.keyCapabilities));
      form.append("image", data.imageFile);
      const response = await axiosInstance.put(`/real-state/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await axiosInstance.put(`/real-state/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/real-state/${id}`);
    return response.data;
  },
};
