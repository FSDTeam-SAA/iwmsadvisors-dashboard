// src/components/features/heroSection/hooks/useHeroSection.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHeroSections,
  createHeroSection,
  updateHeroSection,
  deleteHeroSection,
} from "../api/heroSection.api";

export const useHeroSections = () => {
  return useQuery({
    queryKey: ["hero-sections"],
    queryFn: () => getHeroSections(),
  });
};

export const useCreateHeroSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHeroSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-sections"] });
    },
  });
};

export const useUpdateHeroSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title?: string;
        subtitle?: string;
        image?: File;
      };
    }) => updateHeroSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-sections"] });
    },
  });
};

export const useDeleteHeroSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHeroSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero-sections"] });
    },
  });
};
