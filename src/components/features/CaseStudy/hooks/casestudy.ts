// src/components/features/CaseStudy/hooks/casestudy.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { casestudyApi } from "../api/casestudy.api";
import { CaseStudy } from "../types/casestudy.types";

export const useCaseStudies = () => {
  return useQuery({
    queryKey: ["case-studies"],
    queryFn: casestudyApi.getAllCaseStudies,
  });
};

export const useUpdateCaseStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CaseStudy> }) =>
      casestudyApi.updateCaseStudy(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
    },
  });
};

export const useDeleteCaseStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => casestudyApi.deleteCaseStudy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
    },
  });
};

export const useCreateCaseStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Omit<CaseStudy, "_id" | "createdAt" | "updatedAt" | "__v">,
    ) => casestudyApi.createCaseStudy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
    },
  });
};
