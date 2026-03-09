import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { strengthSectionApi } from "../api/strengthSection.api";
import { toast } from "sonner";

export const useStrengthSection = () => {
  return useQuery({
    queryKey: ["strength-section"],
    queryFn: strengthSectionApi.getStrengthSection,
  });
};

export const useCreateStrength = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: strengthSectionApi.createStrengthSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["strength-section"] });
      toast.success("Strength section created successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to create strength section",
      );
    },
  });
};

export const useUpdateStrength = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title?: string; subtitle?: string };
    }) => strengthSectionApi.updateStrengthSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["strength-section"] });
      toast.success("Strength section updated successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to update strength section",
      );
    },
  });
};

export const useDeleteStrength = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: strengthSectionApi.deleteStrengthSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["strength-section"] });
      toast.success("Strength section deleted successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to delete strength section",
      );
    },
  });
};

// Strength Items Hooks
export const useStrengthItems = () => {
  return useQuery({
    queryKey: ["strength-items"],
    queryFn: strengthSectionApi.getAllStrengthItems,
  });
};

export const useCreateStrengthItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: strengthSectionApi.createStrengthItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["strength-items"] });
      toast.success("Strength item created successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to create strength item",
      );
    },
  });
};

export const useUpdateStrengthItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title?: string; subtitle?: string; image?: File };
    }) => strengthSectionApi.updateStrengthItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["strength-items"] });
      toast.success("Strength item updated successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to update strength item",
      );
    },
  });
};

export const useDeleteStrengthItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: strengthSectionApi.deleteStrengthItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["strength-items"] });
      toast.success("Strength item deleted successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to delete strength item",
      );
    },
  });
};
