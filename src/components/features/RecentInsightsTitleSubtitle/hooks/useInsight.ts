// src/components/features/InsightsTitleSubtitle/hooks/useInsight.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllInsights,
  createInsight,
  updateInsight,
  deleteInsight,
} from "../api/insight.api";
import { CreateInsightDTO } from "../types/insight.types";

export const useInsights = () => {
  return useQuery({
    queryKey: ["insights-recent"],
    queryFn: () => getAllInsights(),
  });
};

export const useCreateInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights-recent"] });
    },
  });
};

export const useUpdateInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateInsightDTO>;
    }) => updateInsight(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights-recent"] });
    },
  });
};

export const useDeleteInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights-recent"] });
    },
  });
};
