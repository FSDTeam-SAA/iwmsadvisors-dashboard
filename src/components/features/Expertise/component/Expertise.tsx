"use client";
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
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Expertise } from "../types/expertise.type";
import { useExpertises, useDeleteExpertise } from "../hooks/useExpertise";
import ExpertiseAddModal from "./ExpertiseAddModal";
import ExpertiseEditModal from "./ExpertiseEditModal";
import ExpertiseViewModal from "./ExpertiseViewModal";

export default function Expertise() {
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useExpertises();
  const { mutate: deleteExpertise } = useDeleteExpertise();

  const expertises: Expertise[] = response?.data ?? [];

  const handleView = (item: Expertise) => {
    setSelectedExpertise(item);
    setIsViewModalOpen(true);
  };

  const handleEdit = (item: Expertise) => {
    setSelectedExpertise(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteExpertise(id, {
      onSuccess: () => {
        toast.success("Expertise deleted successfully");
      },
      onError: () => toast.error("Failed to delete expertise"),
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">
          Error loading expertise items
        </p>
      </div>
    );
  }

  let tableContent: React.ReactNode;

  if (isLoading) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={4} className="py-10 text-center text-gray-400">
          Loading...
        </TableCell>
      </TableRow>
    );
  } else if (expertises.length === 0) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={4} className="py-10 text-center text-gray-400">
          No expertise items found.{" "}
          <button
            className="text-[#0057B8] hover:underline font-medium cursor-pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add one now
          </button>
        </TableCell>
      </TableRow>
    );
  } else {
    tableContent = expertises.map((item) => (
      <TableRow
        key={item._id}
        className="border-b last:border-0 hover:bg-gray-50 transition-colors"
      >
        <TableCell className="py-4 text-center text-gray-700 font-medium">
          {item.title}
        </TableCell>
        <TableCell className="py-4 text-center text-gray-500 text-sm">
          {item.subtitle || "—"}
        </TableCell>
        <TableCell className="py-4 text-center text-gray-500 text-sm max-w-[300px]">
          <span className="line-clamp-2">{item.description1 || "—"}</span>
        </TableCell>
        <TableCell className="py-4 text-center">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleView(item)}
              className="p-2 bg-blue-600 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleEdit(item)}
              className="p-2 bg-green-600 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
            >
              <Edit className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="p-2 bg-red-600 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <div className="space-y-6">
      {/* Table Header / Actions */}
      <div className="flex justify-end">
        {expertises.length === 0 && (
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expertise
          </Button>
        )}
      </div>

      {/* Table Card */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Subtitle
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Description
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {tableContent}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Modals */}
      <ExpertiseViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        expertise={selectedExpertise}
      />
      <ExpertiseEditModal
        key={selectedExpertise?._id}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        expertise={selectedExpertise}
      />
      <ExpertiseAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
