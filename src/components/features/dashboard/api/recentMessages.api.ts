import axiosInstance from "@/lib/instance/axios-instance";
import { RecentMessagesResponse } from "../types/recentMessages.types";

// Get last 4 recent messgae
export const getRecentMessagesApi =
  async (): Promise<RecentMessagesResponse> => {
    const response = await axiosInstance.get("/contact?page=1&limit=4");
    return response.data;
  };
