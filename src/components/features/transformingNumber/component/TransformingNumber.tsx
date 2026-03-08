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
import {
  useTransformingNumber,
  useDeleteTransformingNumber,
} from "../hooks/useTransformingNumber";
import TransformingNumberAddModal from "@/components/features/transformingNumber/component/TransformingNumberAddModal";
import TransformingNumberEditModal from "@/components/features/transformingNumber/component/TransformingNumberEditModal";
import TransformingNumberViewModal from "@/components/features/transformingNumber/component/TransformingNumberViewModal";

export default function TransformingNumberComponent() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useTransformingNumber();
  const { mutate: deleteSection } = useDeleteTransformingNumber();

  const section = response?.data;

  const handleView = () => {
    setIsViewModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (globalThis.confirm("Are you sure you want to delete this section?")) {
      deleteSection(undefined, {
        onSuccess: () => toast.success("Number section deleted successfully"),
        onError: () => toast.error("Failed to delete number section"),
      });
    }
  };

  if (isError || (response && !response.status)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transforming Number Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Transforming Number
            </span>
          </nav>
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          {!section && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Number Section
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-left pl-6">
                  Items Count
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-left">
                  Last Updated
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {section ? (
                <TableRow className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <TableCell className="py-4 text-left pl-6 text-gray-700 font-medium">
                    {section.items.length} Items
                  </TableCell>
                  <TableCell className="py-4 text-left text-gray-600">
                    {new Date(section.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={handleView}
                        className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={handleEdit}
                        className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-10 text-center text-gray-400"
                  >
                    No sections found.{" "}
                    {!isLoading && (
                      <button
                        className="text-[#0057B8] hover:underline font-medium cursor-pointer"
                        onClick={() => setIsAddModalOpen(true)}
                      >
                        Add one now
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <TransformingNumberAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <TransformingNumberEditModal
        key={section?._id || "edit-modal"}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        section={section || null}
      />

      <TransformingNumberViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        section={section || null}
      />
    </div>
  );
}
