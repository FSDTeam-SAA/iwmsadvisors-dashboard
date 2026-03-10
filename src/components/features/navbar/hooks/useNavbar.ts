import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { navbarApi } from "../api/navbar.api";
import { toast } from "sonner";

export const useNavbar = () => {
  return useQuery({
    queryKey: ["navbar"],
    queryFn: navbarApi.getNavbar,
  });
};

export const useCreateNavbar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: navbarApi.createNavbar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navbar"] });
      toast.success("Navbar logo created successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to create navbar logo",
      );
    },
  });
};

export const useUpdateNavbar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { logo?: File } }) =>
      navbarApi.updateNavbar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navbar"] });
      toast.success("Navbar logo updated successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to update navbar logo",
      );
    },
  });
};

export const useDeleteNavbar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: navbarApi.deleteNavbar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navbar"] });
      toast.success("Navbar logo deleted successfully");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err?.response?.data?.message || "Failed to delete navbar logo",
      );
    },
  });
};
