// src/components/features/contactServices/hooks/useContactServices.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactServicesApi } from "../api/contactServices.api";
import { CreateTitleRequest, UpdateTitleRequest } from "../types/contactServices.type";

export const useContactServicesTitles = () => {
  return useQuery({
    queryKey: ["contact-services-titles"],
    queryFn: contactServicesApi.getAllTitles,
  });
};

export const useCreateContactServicesTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTitleRequest) => contactServicesApi.createTitle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-services-titles"] });
    },
  });
};

export const useUpdateContactServicesTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTitleRequest;
    }) => contactServicesApi.updateTitle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-services-titles"] });
    },
  });
};

export const useDeleteContactServicesTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactServicesApi.deleteTitle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-services-titles"] });
    },
  });
};
