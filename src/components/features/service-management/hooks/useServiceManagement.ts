import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceManagementApi } from "../api/serviceManagement.api";
import { ServicePageResponse } from "../types/service-management.types";

export const useServiceManagement = (page = 1, limit = 10) => {
  return useQuery<ServicePageResponse>({
    queryKey: ["service-pages", page, limit],
    queryFn: () => serviceManagementApi.getAll(page, limit),
  });
};

export const useCreateServicePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: serviceManagementApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-pages"] });
    },
  });
};

export const useUpdateServicePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Parameters<typeof serviceManagementApi.update>[1]>;
    }) => serviceManagementApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-pages"] });
    },
  });
};

export const useDeleteServicePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: serviceManagementApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-pages"] });
    },
  });
};
