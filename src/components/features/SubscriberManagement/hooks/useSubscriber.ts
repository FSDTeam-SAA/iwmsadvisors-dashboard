import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSubscribers, deleteSubscriber } from "../api/subscriber.api";

export const useSubscribers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["subscribers", page, limit],
    queryFn: () => getSubscribers(page, limit),
  });
};

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSubscriber(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });
};
