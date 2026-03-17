import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { consultantApi } from "../api/consultant.api";

export const useConsultants = () => {
  return useQuery({
    queryKey: ["consultants"],
    queryFn: consultantApi.getAllConsultants,
  });
};

export const useCreateConsultant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: consultantApi.createConsultant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] });
    },
  });
};

export const useUpdateConsultant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof consultantApi.updateConsultant>[1];
    }) => consultantApi.updateConsultant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] });
    },
  });
};

export const useDeleteConsultant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: consultantApi.deleteConsultant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] });
    },
  });
};
