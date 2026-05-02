// src/components/features/ServiceTitleSubtitle/hooks/useService.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllServiceTitles,
  createServiceTitle,
  updateServiceTitle,
  deleteServiceTitle,
} from "../api/service.api";
import { CreateServiceTitleDTO } from "../types/service.types";

export const useServiceTitles = () => {
  return useQuery({
    queryKey: ["service-titles"],
    queryFn: () => getAllServiceTitles(),
  });
};

export const useCreateServiceTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createServiceTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-titles"] });
    },
  });
};

export const useUpdateServiceTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateServiceTitleDTO>;
    }) => updateServiceTitle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-titles"] });
    },
  });
};

export const useDeleteServiceTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteServiceTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-titles"] });
    },
  });
};
