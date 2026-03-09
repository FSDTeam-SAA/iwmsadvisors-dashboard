import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransformingNumber,
  createTransformingNumber,
  updateTransformingNumber,
  deleteTransformingNumber,
} from "../api/transformingNumber.api";
import {
  TransformingNumberCreateInput,
  TransformingNumberUpdateInput,
} from "../types/transformingNumber.type";

/**
 * Hook to get the transforming number section
 */
export const useTransformingNumber = () => {
  return useQuery({
    queryKey: ["transforming-number"],
    queryFn: getTransformingNumber,
  });
};

/**
 * Hook to create a new transforming number section
 */
export const useCreateTransformingNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransformingNumberCreateInput) =>
      createTransformingNumber(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transforming-number"] });
    },
  });
};

/**
 * Hook to update an existing transforming number section
 */
export const useUpdateTransformingNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransformingNumberUpdateInput) =>
      updateTransformingNumber(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transforming-number"] });
    },
  });
};

/**
 * Hook to delete a transforming number section
 */
export const useDeleteTransformingNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTransformingNumber(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transforming-number"] });
    },
  });
};
