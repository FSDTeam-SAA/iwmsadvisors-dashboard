// src/components/features/CareerTitleSubtitle/hooks/useCareerTitle.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCareerTitles,
  createCareerTitle,
  updateCareerTitle,
  deleteCareerTitle,
} from "../api/careerTitle.api";
import { CreateCareerTitleDTO } from "../types/careerTitle.types";

export const useCareerTitles = () => {
  return useQuery({
    queryKey: ["career-titles"],
    queryFn: () => getAllCareerTitles(),
  });
};

export const useCreateCareerTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCareerTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career-titles"] });
    },
  });
};

export const useUpdateCareerTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateCareerTitleDTO>;
    }) => updateCareerTitle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career-titles"] });
    },
  });
};

export const useDeleteCareerTitle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCareerTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career-titles"] });
    },
  });
};
