import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBannerSections,
  createBannerSection,
  updateBannerSection,
  deleteBannerSection,
} from "../api/bannerSection.api";
import { BannerSection } from "../types/bannerSection.type";

export const useBannerSections = () => {
  return useQuery({
    queryKey: ["banner-sections"],
    queryFn: () => getBannerSections(),
  });
};

export const useCreateBannerSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBannerSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner-sections"] });
    },
  });
};

export const useUpdateBannerSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<BannerSection> & { imageFile?: File };
    }) => updateBannerSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner-sections"] });
    },
  });
};

export const useDeleteBannerSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBannerSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner-sections"] });
    },
  });
};
