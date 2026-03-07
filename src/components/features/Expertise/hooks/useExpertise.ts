// /src/components/features/Expertise/hooks/useExpertise.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExpertises,
  createExpertise,
  updateExpertise,
  deleteExpertise,
} from "../api/expertise.api";
import { ExpertiseUpdateInput } from "../types/expertise.type";

export const useExpertises = () => {
  return useQuery({
    queryKey: ["expertises"],
    queryFn: getExpertises,
  });
};

export const useCreateExpertise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpertise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expertises"] });
    },
  });
};

export const useUpdateExpertise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExpertiseUpdateInput }) =>
      updateExpertise(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expertises"] });
    },
  });
};

export const useDeleteExpertise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpertise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expertises"] });
    },
  });
};
