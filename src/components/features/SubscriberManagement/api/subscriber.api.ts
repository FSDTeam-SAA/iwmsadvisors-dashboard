import axiosInstance from "@/lib/instance/axios-instance";
import { SubscriberResponse } from "../types/subscriber.types";

export const getSubscribers = async (
  page = 1,
  limit = 10,
): Promise<SubscriberResponse> => {
  const response = await axiosInstance.get(
    `/broadcast/all-subscribers?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const deleteSubscriber = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/broadcast/all-subscribers/${id}`);
};
