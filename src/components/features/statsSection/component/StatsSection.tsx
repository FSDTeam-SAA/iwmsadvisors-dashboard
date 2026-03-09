"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  useStatsSections,
  useDeleteStatsSection,
} from "../hooks/useStatsSection";
import { StatsSection as StatsSectionType } from "../types/statsSection.type";
import StatsSectionAddModal from "./StatsSectionAddModal";
import StatsSectionEditModal from "./StatsSectionEditModal";
 
export default function StatsSection() {
  const { data: response, isLoading, isError } = useStatsSections();
  const statsSections = response?.data || [];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStatsForEdit, setSelectedStatsForEdit] =
    useState<StatsSectionType | null>(null);

  // Delete State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStatsForDelete, setSelectedStatsForDelete] =
    useState<StatsSectionType | null>(null);

  const { mutate: deleteSection, isPending: isDeleting } =
    useDeleteStatsSection();

  const handleEditClick = (section: StatsSectionType) => {
    setSelectedStatsForEdit(section);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (section: StatsSectionType) => {
    setSelectedStatsForDelete(section);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStatsForDelete?._id) {
      deleteSection(selectedStatsForDelete._id, {
        onSuccess: () => {
          toast.success("Stats section deleted successfully");
          setIsDeleteDialogOpen(false);
          setSelectedStatsForDelete(null);
        },
        onError: () => toast.error("Failed to delete stats section"),
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
        Failed to load Stats sections. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Stats Sections Management
          </h2>
          <p className="text-muted-foreground">
            Manage the stats sections displayed on the landing page.
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0057B8] hover:bg-[#004494]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stats Section
        </Button>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Title</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead>Items Count</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statsSections.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No Stats sections found. Click &quot;Add Stats Section&quot;
                  to create one.
                </TableCell>
              </TableRow>
            ) : (
              statsSections.map((section) => (
                <TableRow key={section._id}>
                  <TableCell className="font-medium">{section.title}</TableCell>
                  <TableCell className="text-gray-500 truncate max-w-[250px]">
                    {section.subtitle || "-"}
                  </TableCell>
                  <TableCell>{section.items?.length || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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

      <StatsSectionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <StatsSectionEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStatsForEdit(null);
        }}
        statsSection={selectedStatsForEdit}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm text-gray-500">
            This action cannot be undone. This will permanently delete the Stats
            section{" "}
            <span className="font-semibold text-gray-900">
              &quot;{selectedStatsForDelete?.title}&quot;
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
