import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mrefSectionApi } from "../api/mrefSection.api";
import {
  CreateMrefSectionData,
  MrefResponse,
  MrefSection,
} from "../types/mrefSection.types";

export const useMrefSections = () => {
  return useQuery<MrefResponse>({
    queryKey: ["mref-sections"],
    queryFn: mrefSectionApi.getAll,
  });
};

export const useUpdateMrefSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<MrefSection> & { imageFile?: File };
    }) => mrefSectionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mref-sections"] });
    },
  });
};

export const useDeleteMrefSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mrefSectionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mref-sections"] });
    },
  });
};

export const useCreateMrefSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMrefSectionData) => mrefSectionApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mref-sections"] });
    },
  });
};
