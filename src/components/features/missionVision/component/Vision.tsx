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
import { Eye, Edit, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { Vision } from "../types/missionVision.type";
import { useVisions, useDeleteVision } from "../hooks/useMissionVision";
import VisionAddModal from "./VisionAddModal";
import VisionEditModal from "./VisionEditModal";
import VisionViewModal from "./VisionViewModal";

export default function VisionSection() {
  const [selectedVision, setSelectedVision] = useState<Vision | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useVisions();
  const { mutate: deleteVision } = useDeleteVision();

  const visions: Vision[] = response?.data ?? [];

  const handleView = (item: Vision) => {
    setSelectedVision(item);
    setIsViewModalOpen(true);
  };

  const handleEdit = (item: Vision) => {
    setSelectedVision(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteVision(id, {
      onSuccess: () => {
        toast.success("Vision deleted successfully");
      },
      onError: () => toast.error("Failed to delete vision"),
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading visions</p>
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
  } else if (visions.length === 0) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={4} className="py-10 text-center text-gray-400">
          No visions found.{" "}
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
    tableContent = visions.map((item) => (
      <TableRow
        key={item._id}
        className="border-b last:border-0 hover:bg-gray-50 transition-colors"
      >
        {/* Thumbnail */}
        <TableCell className="py-4 text-center">
          {item.image ? (
            <div className="relative w-12 h-12 rounded-md overflow-hidden border mx-auto">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <span className="text-gray-400 text-xs">No image</span>
          )}
        </TableCell>
        <TableCell className="py-4 text-center text-gray-700 font-medium">
          {item.title}
        </TableCell>
        <TableCell className="py-4 text-center text-gray-500 text-sm max-w-[280px]">
          <span className="line-clamp-2">{item.description || "—"}</span>
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
              className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
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
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Vision Management
          </h1>
        </div>
        {visions.length === 0 && (
          <div className="w-full md:w-auto flex md:justify-end">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vision
            </Button>
          </div>
        )}
      </div>

      {/* Table Card */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Image
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Title
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
      <VisionViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        vision={selectedVision}
      />
      <VisionEditModal
        key={selectedVision?._id}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        vision={selectedVision}
      />
      <VisionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
