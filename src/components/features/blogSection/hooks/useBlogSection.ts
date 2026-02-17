// src/components/features/blogSection/hooks/useBlogSection.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogSection,
  deleteBlogSection,
  getBlogSections,
  updateBlogSection,
} from "../api/blogSection.api";
import { BlogSection } from "../types/blogsection.types";

export const useBlogSections = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["blog-sections", page, limit],
    queryFn: () => getBlogSections(page, limit),
  });
};

export const useCreateBlogSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<BlogSection> & { imageFile?: File }) =>
      createBlogSection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-sections"] });
    },
  });
};

export const useUpdateBlogSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<BlogSection> & { imageFile?: File };
    }) => updateBlogSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-sections"] });
    },
  });
};

export const useDeleteBlogSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlogSection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-sections"] });
    },
  });
};
