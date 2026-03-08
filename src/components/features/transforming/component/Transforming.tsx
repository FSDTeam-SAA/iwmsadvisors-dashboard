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
import { Eye, Trash2, Edit, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TransformSection } from "../types/transforming.type";
import {
  useTransformSections,
  useDeleteTransformSection,
} from "../hooks/useTransforming";
import TransformAddModal from "./TransformAddModal";
import TransformEditModal from "./TransformEditModal";
import TransformViewModal from "./TransformViewModal";
import Image from "next/image";

export default function Transforming() {
  const [selectedTransform, setSelectedTransform] =
    useState<TransformSection | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useTransformSections();
  const { mutate: deleteTransform } = useDeleteTransformSection();

  const transforms = response?.data || [];

  const handleView = (transform: TransformSection) => {
    setSelectedTransform(transform);
    setIsViewModalOpen(true);
  };

  const handleEdit = (transform: TransformSection) => {
    setSelectedTransform(transform);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteTransform(id, {
      onSuccess: () => toast.success("Transform section deleted successfully"),
      onError: () => toast.error("Failed to delete transform section"),
    });
  };

  if (isError || (response && !response.status)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <p className="text-red-500 font-medium">
          Error loading transform sections
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transform Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Transform Management
            </span>
          </nav>
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          {transforms.length === 0 && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transform Section
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Image 1
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-left">
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-left">
                  Description
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {transforms.length > 0 ? (
                transforms.map((item: TransformSection) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center">
                      <div className="relative w-12 h-12 mx-auto rounded-lg overflow-hidden bg-gray-100">
                        {item.image1 ? (
                          <Image
                            src={item.image1}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            N/A
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-left text-gray-700 font-medium max-w-[200px] truncate">
                      {item.title}
                    </TableCell>
                    <TableCell className="py-4 text-left text-gray-600 max-w-[300px] truncate">
                      {item.description || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-gray-400"
                  >
                    No transform sections found.{" "}
                    <button
                      className="text-[#0057B8] hover:underline font-medium cursor-pointer"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      Add one now
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <TransformViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        transformSection={selectedTransform}
      />

      <TransformEditModal
        key={selectedTransform?._id || "edit-modal"}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transformSection={selectedTransform}
      />

      <TransformAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
