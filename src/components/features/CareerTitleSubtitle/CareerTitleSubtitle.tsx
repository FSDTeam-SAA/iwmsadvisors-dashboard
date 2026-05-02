// src/components/features/CareerTitleSubtitle/CareerTitleSubtitle.tsx

"use client";

import { useState } from "react";
import { ChevronRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useCareerTitles,
  useCreateCareerTitle,
  useUpdateCareerTitle,
  useDeleteCareerTitle,
} from "./hooks/useCareerTitle";
import CareerTitleModal from "./component/CareerTitleModal";
import { CareerTitleCard } from "./component/CareerTitleCard";
import { CareerTitle, CreateCareerTitleDTO } from "./types/careerTitle.types";

export default function CareerTitleSubtitle() {
  const [selectedCareerTitle, setSelectedCareerTitle] = useState<CareerTitle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useCareerTitles();
  const { mutate: createCareerTitle, isPending: isCreating } = useCreateCareerTitle();
  const { mutate: updateCareerTitle, isPending: isUpdating } = useUpdateCareerTitle();
  const { mutate: deleteCareerTitle, isPending: isDeleting } = useDeleteCareerTitle();

  const careerTitles = response?.data || [];

  const handleAdd = () => {
    setSelectedCareerTitle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (careerTitle: CareerTitle) => {
    setSelectedCareerTitle(careerTitle);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
   
      deleteCareerTitle(id, {
        onSuccess: () => toast.success("Career title deleted successfully"),
        onError: () => toast.error("Failed to delete career title"),
      });
  
  };

  const handleSave = (data: CreateCareerTitleDTO) => {
    if (selectedCareerTitle) {
      updateCareerTitle(
        { id: selectedCareerTitle._id, data },
        {
          onSuccess: () => {
            toast.success("Career title updated successfully");
            setIsModalOpen(false);
          },
          onError: () => toast.error("Failed to update career title"),
        }
      );
    } else {
      createCareerTitle(data, {
        onSuccess: () => {
          toast.success("Career title created successfully");
          setIsModalOpen(false);
        },
        onError: () => toast.error("Failed to create career title"),
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
        <p className="text-red-500 font-medium">Error loading career titles</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Career Title & Subtitle
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Career Title Subtitle
            </span>
          </nav>
        </div>

        {/* Show Add button only if there are no career titles */}
        {careerTitles.length === 0 && (
          <Button
            onClick={handleAdd}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Career Title
          </Button>
        )}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          (isDeleting || isCreating || isUpdating) && "opacity-50 pointer-events-none"
        )}
      >
        {careerTitles.length > 0 ? (
          careerTitles.map((careerTitle: CareerTitle) => (
            <CareerTitleCard
              key={careerTitle._id}
              careerTitle={careerTitle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg font-medium">
              No career titles found
            </p>
            <Button
              variant="link"
              className="text-[#0057B8] mt-2 font-semibold cursor-pointer"
              onClick={handleAdd}
            >
              Create your first career title & subtitle
            </Button>
          </div>
        )}
      </div>

      <CareerTitleModal
        key={isModalOpen ? (selectedCareerTitle?._id || "new") : "closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedCareerTitle}
      />
    </div>
  );
}
