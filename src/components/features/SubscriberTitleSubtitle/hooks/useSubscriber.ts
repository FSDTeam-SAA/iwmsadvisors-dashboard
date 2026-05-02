// src/components/features/SubscriberTitleSubtitle/hooks/useSubscriber.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSubscriberTitles,
  createSubscriberTitle,
  updateSubscriberTitle,
  deleteSubscriberTitle,
} from "../api/subscriber.api";
import { CreateSubscriberTitleDTO } from "../types/subscriber.types";

export const useSubscriberTitles = () => {
  return useQuery({
    queryKey: ["subscriber-titles"],
    queryFn: () => getAllSubscriberTitles(),
  });
};

export const useCreateSubscriberTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubscriberTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriber-titles"] });
    },
  });
};

export const useUpdateSubscriberTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateSubscriberTitleDTO>;
    }) => updateSubscriberTitle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriber-titles"] });
    },
  });
};

export const useDeleteSubscriberTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubscriberTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriber-titles"] });
    },
  });
};
