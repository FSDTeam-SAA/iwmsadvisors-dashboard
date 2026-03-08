import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransformSections,
  createTransformSection,
  updateTransformSection,
  deleteTransformSection,
} from "../api/transforming.api";
import {
  TransformSectionCreateInput,
  TransformSectionUpdateInput,
} from "../types/transforming.type";

/**
 * Hook to get all transform sections
 */
export const useTransformSections = () => {
  return useQuery({
    queryKey: ["transform-sections"],
    queryFn: getTransformSections,
  });
};

/**
 * Hook to create a new transform section
 */
export const useCreateTransformSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransformSectionCreateInput) =>
      createTransformSection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transform-sections"] });
    },
  });
};

/**
 * Hook to update an existing transform section
 */
export const useUpdateTransformSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: TransformSectionUpdateInput;
    }) => updateTransformSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transform-sections"] });
    },
  });
};

/**
 * Hook to delete a transform section
 */
export const useDeleteTransformSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransformSection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transform-sections"] });
    },
  });
};
