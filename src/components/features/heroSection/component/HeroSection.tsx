"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Image from "next/image";

export default function HeroSection() {
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

      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[80px]">Order</TableHead>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedHeroSections.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No Hero sections found. Click &quot;Add Hero Section&quot; to
                  create one.
                </TableCell>
              </TableRow>
            ) : (
              sortedHeroSections.map((section) => (
                <TableRow key={section._id}>
                  <TableCell className="font-medium">{section.order}</TableCell>
                  <TableCell>
                    {section.image ? (
                      <div className="relative w-12 h-12 rounded overflow-hidden border bg-gray-50">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded border bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                        <FileImage className="w-4 h-4" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{section.title}</TableCell>
                  <TableCell className="text-gray-500 truncate max-w-[200px]">
                    {section.subtitle || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewClick(section)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        title="View detail"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(section)}
                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        title="Edit section"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteClick(section)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        title="Delete section"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <HeroSectionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <HeroSectionEditModal
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
