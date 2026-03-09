import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { statsSectionApi } from "../api/statsSection.api";

export const useStatsSections = () => {
  return useQuery({
    queryKey: ["stats-sections"],
    queryFn: statsSectionApi.getAllStatsSections,
  });
};

export const useCreateStatsSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: statsSectionApi.createStatsSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats-sections"] });
    },
  });
};

export const useUpdateStatsSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof statsSectionApi.updateStatsSection>[1];
    }) => statsSectionApi.updateStatsSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats-sections"] });
    },
  });
};

export const useDeleteStatsSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: statsSectionApi.deleteStatsSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats-sections"] });
    },
  });
};
