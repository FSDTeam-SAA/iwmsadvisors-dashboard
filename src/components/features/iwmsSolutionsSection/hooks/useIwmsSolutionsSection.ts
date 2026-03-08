// src/components/features/iwmsSolutionsSection/hooks/useIwmsSolutionsSection.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getIwmsSolutionsSections,
  createIwmsSolutionsSection,
  updateIwmsSolutionsSection,
  deleteIwmsSolutionsSection,
} from "../api/iwmsSolutionsSection.api";
import { IwmsSolutionsItem } from "../types/iwmsSolutionsSection.type";

export const useIwmsSolutionsSections = () => {
  return useQuery({
    queryKey: ["iwms-solutions-sections"],
    queryFn: () => getIwmsSolutionsSections(),
  });
};

export const useCreateIwmsSolutionsSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIwmsSolutionsSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["iwms-solutions-sections"] });
    },
  });
};

export const useUpdateIwmsSolutionsSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        order?: number;
        title?: string;
        subtitle?: string;
        items?: Omit<IwmsSolutionsItem, "icon">[];
        icon_1?: File;
        icon_2?: File;
        icon_3?: File;
        icon_4?: File;
      };
    }) => updateIwmsSolutionsSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["iwms-solutions-sections"] });
    },
  });
};

export const useDeleteIwmsSolutionsSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteIwmsSolutionsSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["iwms-solutions-sections"] });
    },
  });
};
