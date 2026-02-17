import { useQuery } from "@tanstack/react-query";
import { getRecentMessagesApi } from "../api/recentMessages.api";
import { RecentMessagesResponse } from "../types/recentMessages.types";

export const useRecentMessages = () => {
  return useQuery<RecentMessagesResponse>({
    queryKey: ["recent-messages"],
    queryFn: getRecentMessagesApi,
  });
};
