// src/components/features/ServiceTitleSubtitle/ServiceTitleSubtitle.tsx

"use client";

import { useState } from "react";
import { ChevronRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useServiceTitles,
  useCreateServiceTitle,
  useUpdateServiceTitle,
  useDeleteServiceTitle,
} from "./hooks/useService";
import ServiceModal from "./component/ServiceModal";
import { ServiceCard } from "./component/ServiceCard";
import { ServiceTitle, CreateServiceTitleDTO } from "./types/service.types";

export default function ServiceTitleSubtitle() {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<ServiceTitle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useServiceTitles();
  const { mutate: createServiceTitle, isPending: isCreating } = useCreateServiceTitle();
  const { mutate: updateServiceTitle, isPending: isUpdating } = useUpdateServiceTitle();
  const { mutate: deleteServiceTitle, isPending: isDeleting } = useDeleteServiceTitle();

  const serviceTitles = response?.data || [];

  const handleAdd = () => {
    setSelectedServiceTitle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (serviceTitle: ServiceTitle) => {
    setSelectedServiceTitle(serviceTitle);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {

      deleteServiceTitle(id, {
        onSuccess: () => toast.success("Service title deleted successfully"),
        onError: () => toast.error("Failed to delete service title"),
      });

  };

  const handleSave = (data: CreateServiceTitleDTO) => {
    if (selectedServiceTitle) {
      updateServiceTitle(
        { id: selectedServiceTitle._id, data },
        {
          onSuccess: () => {
            toast.success("Service title updated successfully");
            setIsModalOpen(false);
          },
          onError: () => toast.error("Failed to update service title"),
        }
      );
    } else {
      createServiceTitle(data, {
        onSuccess: () => {
          toast.success("Service title created successfully");
          setIsModalOpen(false);
        },
        onError: () => toast.error("Failed to create service title"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#0057B8]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading service titles</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Service Title & Subtitle
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Service Title Subtitle
            </span>
          </nav>
        </div>

        {/* Show Add button only if there are no service titles */}
        {serviceTitles.length === 0 && (
          <Button
            onClick={handleAdd}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service Title
          </Button>
        )}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          (isDeleting || isCreating || isUpdating) && "opacity-50 pointer-events-none"
        )}
      >
        {serviceTitles.length > 0 ? (
          serviceTitles.map((serviceTitle: ServiceTitle) => (
            <ServiceCard
              key={serviceTitle._id}
              serviceTitle={serviceTitle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg font-medium">
              No service titles found
            </p>
            <Button
              variant="link"
              className="text-[#0057B8] mt-2 font-semibold cursor-pointer"
              onClick={handleAdd}
            >
              Create your first service title & subtitle
            </Button>
          </div>
        )}
      </div>

      <ServiceModal
        key={isModalOpen ? (selectedServiceTitle?._id || "new") : "closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedServiceTitle}
      />
    </div>
  );
}
