// src/components/features/contactInformationSection/hooks/useContactInformation.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getContactInformation,
  createContactInformation,
  updateContactInformation,
  deleteContactInformation,
} from "../api/contactInformation.api";
import { ContactInformation } from "../types/contactInformation.type";

export const useContactInformation = () => {
  return useQuery({
    queryKey: ["contact-information"],
    queryFn: () => getContactInformation(),
  });
};

export const useCreateContactInformation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContactInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-information"] });
    },
  });
};

export const useUpdateContactInformation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ContactInformation>) =>
      updateContactInformation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-information"] });
    },
  });
};

export const useDeleteContactInformation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContactInformation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-information"] });
    },
  });
};
