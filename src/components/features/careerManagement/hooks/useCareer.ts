// src/components/features/careerManagement/hooks/useCareer.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
  getCareerApplications,
  getCareerApplicationById,
  updateApplicationStatus,
  deleteCareerApplication,
} from "../api/career.api";
import { Career, ApplicationStatus } from "../types/career.types";
import { toast } from "sonner";

export const useCareers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["careers", page, limit],
    queryFn: () => getCareers(page, limit),
  });
};

export const useCareer = (id: string) => {
  return useQuery({
    queryKey: ["career", id],
    queryFn: () => getCareerById(id),
    enabled: !!id,
  });
};

export const useCreateCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Career>) => createCareer(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      toast.success(response.message || "Career created successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to create career");
    },
  });
};

export const useUpdateCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Career> }) =>
      updateCareer(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      queryClient.invalidateQueries({ queryKey: ["career", response.data._id] });
      toast.success(response.message || "Career updated successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update career");
    },
  });
};

export const useDeleteCareer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCareer(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["careers"] });
      toast.success(response.message || "Career deleted successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete career");
    },
  });
};

// --- Application Hooks ---

export const useCareerApplications = (page = 1, limit = 10, careerId?: string) => {
  return useQuery({
    queryKey: ["career-applications", page, limit, careerId],
    queryFn: () => getCareerApplications(page, limit, careerId),
  });
};

export const useCareerApplication = (id: string) => {
  return useQuery({
    queryKey: ["career-application", id],
    queryFn: () => getCareerApplicationById(id),
    enabled: !!id,
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["career-applications"] });
      queryClient.invalidateQueries({ queryKey: ["career-application", response.data._id] });
      toast.success(response.message || "Application status updated successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update application status");
    },
  });
};

export const useDeleteCareerApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCareerApplication(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["career-applications"] });
      toast.success(response.message || "Application deleted successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete application");
    },
  });
};
