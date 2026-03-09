import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationApi } from "../api/applicationManagement.api";

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: applicationApi.getAllApplications,
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationApi.deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
