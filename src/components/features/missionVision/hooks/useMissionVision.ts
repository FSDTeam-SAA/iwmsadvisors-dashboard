// src/components/features/missionVision/hooks/useMissionVision.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVisions,
  getMission,
  createVision,
  createMission,
  updateVision,
  deleteVision,
  updateMission,
  deleteMission,
} from "../api/missionVision.api";

// ── Vision Hooks ──────────────────────────────────────────────

export const useVisions = () => {
  return useQuery({
    queryKey: ["visions"],
    queryFn: getVisions,
  });
};

export const useCreateVision = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVision,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visions"] });
    },
  });
};

export const useUpdateVision = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title?: string; description?: string; image?: File };
    }) => updateVision(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visions"] });
    },
  });
};

export const useDeleteVision = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVision,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visions"] });
    },
  });
};

// ── Mission Hooks ─────────────────────────────────────────────

export const useMission = () => {
  return useQuery({
    queryKey: ["mission"],
    queryFn: getMission,
  });
};

export const useCreateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission"] });
    },
  });
};

export const useUpdateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title?: string; description?: string; image?: File };
    }) => updateMission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission"] });
    },
  });
};

export const useDeleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mission"] });
    },
  });
};
