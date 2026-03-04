// src/components/features/aboutSection/hooks/useAboutSection.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAboutSections,
  createAboutSection,
  updateAboutSection,
  deleteAboutSection,
} from "../api/aboutSection.api";
import { AboutSection } from "../types/aboutSection.type";

export const useAboutSections = () => {
  return useQuery({
    queryKey: ["about-sections"],
    queryFn: () => getAboutSections(),
  });
};

export const useCreateAboutSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAboutSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-sections"] });
    },
  });
};

export const useUpdateAboutSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<AboutSection> & { imageFile?: File };
    }) => updateAboutSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-sections"] });
    },
  });
};

export const useDeleteAboutSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAboutSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-sections"] });
    },
  });
};
