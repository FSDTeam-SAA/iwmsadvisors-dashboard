"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCard } from "./HeroCard";
import { useHeroSections, useDeleteHeroSection } from "../hooks/useHeroSection";
import HeroSectionAddModal from "./HeroSectionAddModal";
import HeroSectionEditModal from "./HeroSectionEditModal";
import HeroSectionViewModal from "./HeroSectionViewModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { HeroSection as HeroSectionType } from "../types/heroSection.type";

export default function HeroSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const { data: response, isLoading, isError } = useHeroSections();
  const heroSections = response?.data || [];

  // Sort sections by order
  const sortedHeroSections = [...heroSections].sort(
    (a, b) => a.order - b.order,
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHeroForEdit, setSelectedHeroForEdit] =
    useState<HeroSectionType | null>(null);

  // View State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedHeroForView, setSelectedHeroForView] =
    useState<HeroSectionType | null>(null);

  // Delete State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHeroForDelete, setSelectedHeroForDelete] =
    useState<HeroSectionType | null>(null);

  const { mutate: deleteSection, isPending: isDeleting } =
    useDeleteHeroSection();

  const handleEditClick = (section: HeroSectionType) => {
    setSelectedHeroForEdit(section);
    setIsEditModalOpen(true);
  };

  const handleViewClick = (section: HeroSectionType) => {
    setSelectedHeroForView(section);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (section: HeroSectionType) => {
    setSelectedHeroForDelete(section);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedHeroForDelete?._id) {
      deleteSection(selectedHeroForDelete._id, {
        onSuccess: () => {
          toast.success("Hero section deleted successfully");
          setIsDeleteDialogOpen(false);
          setSelectedHeroForDelete(null);
        },
        onError: () => toast.error("Failed to delete hero section"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0057B8]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        Failed to load Hero sections. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!showHeader && (
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0057B8] hover:bg-[#004494] shadow-sm transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hero Section
          </Button>
        </div>
      )}

      {showHeader && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Hero Sections Management
            </h2>
            <p className="text-muted-foreground">
              Manage the hero banners displayed on the landing page.
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0057B8] hover:bg-[#004494]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hero Section
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedHeroSections.length === 0 && !isLoading ? (
          <div className="col-span-1 lg:col-span-1 flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-dashed border-gray-200 opacity-60">
            <p className="text-gray-400 text-sm italic">
              (Additional sections will appear here)
            </p>
          </div>
        ) : (
          sortedHeroSections.map((section) => (
            <HeroCard
              key={section._id}
              section={section}
              onView={handleViewClick}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))
        )}
      </div>

      {isAddModalOpen && (
        <HeroSectionAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      <HeroSectionEditModal
        key={selectedHeroForEdit?._id ? `edit-${selectedHeroForEdit._id}` : "edit-modal"}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedHeroForEdit(null);
        }}
        heroSection={selectedHeroForEdit}
      />

      <HeroSectionViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedHeroForView(null);
        }}
        heroSection={selectedHeroForView}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm text-gray-500">
            This action cannot be undone. This will permanently delete the Hero
            section{" "}
            <span className="font-semibold text-gray-900">
              &quot;{selectedHeroForDelete?.title}&quot;
            </span>
            .
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
