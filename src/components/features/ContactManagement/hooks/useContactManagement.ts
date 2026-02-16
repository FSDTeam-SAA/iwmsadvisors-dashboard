// src/components/features/ContactManagement/hooks/useContactManagement.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteContactApi,
  getContactManagementApi,
} from "../api/contactManagement.api";

import { ContactManagementResponse } from "../types/contactManagement.types";

// Get Contact Management Data
export const useContactManagement = (page: number, limit: number) => {
  const { data, isLoading, isError, error } =
    useQuery<ContactManagementResponse>({
      queryKey: ["contact-management", page, limit],
      queryFn: () => getContactManagementApi(page, limit),
    });

  return { data, isLoading, isError, error };
};

// Delete Contact
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: (id: string) => deleteContactApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-management"] });
    },
  });

  return { mutate, isError, error, isPending };
};
