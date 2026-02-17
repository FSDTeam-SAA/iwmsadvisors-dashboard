import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { faqSectionApi } from "../api/faqSection.api";
import {
  CreateFaqSectionData,
  FaqResponse,
  FaqSection,
} from "../types/faqSection.types";

export const useFaqSections = () => {
  return useQuery<FaqResponse>({
    queryKey: ["faq-sections"],
    queryFn: faqSectionApi.getAllFaqSections,
  });
};

export const useCreateFaqSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFaqSectionData) =>
      faqSectionApi.createFaqSection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq-sections"] });
    },
  });
};

export const useUpdateFaqSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FaqSection> }) =>
      faqSectionApi.updateFaqSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq-sections"] });
    },
  });
};

export const useDeleteFaqSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => faqSectionApi.deleteFaqSection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq-sections"] });
    },
  });
};
