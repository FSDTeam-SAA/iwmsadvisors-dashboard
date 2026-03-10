import axiosInstance from "@/lib/instance/axios-instance";
import { NavbarResponse, BaseResponse } from "../types/navbar.type";

export const navbarApi = {
  getNavbar: async (): Promise<NavbarResponse> => {
    const response = await axiosInstance.get("/navbar/get");
    return response.data;
  },

  createNavbar: async (data: { logo: File }): Promise<NavbarResponse> => {
    const formData = new FormData();
    formData.append("logo", data.logo);

    const response = await axiosInstance.post("/navbar/create", formData);
    return response.data;
  },

  updateNavbar: async (
    id: string,
    data: { logo?: File },
  ): Promise<NavbarResponse> => {
    const formData = new FormData();
    if (data.logo) {
      formData.append("logo", data.logo);
    }

    const response = await axiosInstance.patch(
      `/navbar/update`,
      formData,
    );
    return response.data;
  },

  deleteNavbar: async (id: string): Promise<BaseResponse> => {
    const response = await axiosInstance.delete(`/navbar/delete`);
    return response.data;
  },
};
