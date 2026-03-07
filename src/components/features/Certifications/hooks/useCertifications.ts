// src/components/features/Certifications/hooks/useCertifications.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../api/certifications.api";
import { CertificationUpdateInput } from "../types/certifications.type";

export const useCertifications = () => {
  return useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
  });
};

export const useCertification = (id: string) => {
  return useQuery({
    queryKey: ["certification", id],
    queryFn: () => getCertificationById(id),
    enabled: !!id,
  });
};

export const useCreateCertification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
    },
  });
};

export const useUpdateCertification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CertificationUpdateInput;
    }) => updateCertification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
    },
  });
};

export const useDeleteCertification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCertification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
    },
  });
};
