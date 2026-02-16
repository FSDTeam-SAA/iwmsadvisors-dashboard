// src/components/features/ContactManagement/hooks/useContactManagement.ts
import { useQuery } from "@tanstack/react-query";
import { getContactManagementApi } from "../api/contactManagement.api";

import { ContactManagementResponse } from "../types/contactManagement.types";

export const useContactManagement = (page: number, limit: number) => {
  const { data, isLoading, isError, error } =
    useQuery<ContactManagementResponse>({
      queryKey: ["contact-management", page, limit],
      queryFn: () => getContactManagementApi(page, limit),
    });

  return { data, isLoading, isError, error };
};
