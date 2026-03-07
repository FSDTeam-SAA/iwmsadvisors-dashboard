// src/components/features/footerSection/hooks/useFooter.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFooter,
  createFooter,
  updateFooter,
  deleteFooter,
} from "../api/footer.api";
import { Footer } from "../types/footer.type";

export const useFooter = () => {
  return useQuery({
    queryKey: ["footer"],
    queryFn: () => getFooter(),
  });
};

export const useCreateFooter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFooter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });
};

export const useUpdateFooter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Footer> }) =>
      updateFooter({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });
};

export const useDeleteFooter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFooter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });
};
