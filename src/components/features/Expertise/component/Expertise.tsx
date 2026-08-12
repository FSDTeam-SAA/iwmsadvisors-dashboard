"use client";

import { isAxiosError } from "axios";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Expertise as ExpertiseType } from "../types/expertise.type";
import { useDeleteExpertise, useExpertises } from "../hooks/useExpertise";
import ExpertiseAddModal from "./ExpertiseAddModal";
import ExpertiseEditModal from "./ExpertiseEditModal";
import ExpertiseViewModal from "./ExpertiseViewModal";

export default function Expertise() {
  const [selectedExpertise, setSelectedExpertise] =
    useState<ExpertiseType | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { data: response, isLoading, isError } = useExpertises();
  const { mutate: deleteExpertise } = useDeleteExpertise();
  const expertises = response?.data ?? [];

  const handleDelete = (expertise: ExpertiseType) => {
    deleteExpertise(expertise._id, {
      onSuccess: () => toast.success("Expertise deleted successfully"),
      onError: (error: unknown) => {
        const message =
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to delete expertise";
        toast.error(message);
      },
    });
  };

  if (isError || response?.status === false) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="font-medium text-red-500">Error loading expertise sections</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0057B8] font-semibold text-white hover:bg-[#004494]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expertise Section
        </Button>
      </div>

      <Card className="overflow-hidden rounded-xl border-none bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-center font-bold text-gray-600">Title</TableHead>
                <TableHead className="py-4 text-center font-bold text-gray-600">Subtitle</TableHead>
                <TableHead className="py-4 text-center font-bold text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={isLoading ? "opacity-50" : undefined}>
              {expertises.length ? (
                expertises.map((expertise) => (
                  <TableRow key={expertise._id} className="border-b last:border-0 hover:bg-gray-50">
                    <TableCell className="py-4 text-center font-medium text-gray-700">{expertise.title}</TableCell>
                    <TableCell className="max-w-[400px] truncate py-4 text-center text-gray-600">{expertise.subtitle}</TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button type="button" onClick={() => { setSelectedExpertise(expertise); setIsViewModalOpen(true); }} className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600" title="View expertise">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => { setSelectedExpertise(expertise); setIsEditModalOpen(true); }} className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600" title="Edit expertise">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => handleDelete(expertise)} className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600" title="Delete expertise">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="py-10 text-center text-gray-400">
                    No expertise sections found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {isAddModalOpen && <ExpertiseAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}
      {isEditModalOpen && <ExpertiseEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} expertise={selectedExpertise} />}
      {isViewModalOpen && <ExpertiseViewModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} expertise={selectedExpertise} />}
    </div>
  );
}
