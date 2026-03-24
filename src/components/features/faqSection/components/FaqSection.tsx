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
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FaqSectionAddModal from "./FaqSectionAddModal";
import FaqSectionEditModal from "./FaqSectionEditModal";
import FaqSectionViewModal from "./FaqSectionViewModal";
import {
  FaqSection as FaqSectionType,
} from "../types/faqSection.types";
import {
  useCreateFaqSection,
  useDeleteFaqSection,
  useFaqSections,
  useUpdateFaqSection,
} from "../hooks/useFaqSection";

export default function FaqSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selected, setSelected] = useState<FaqSectionType | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Key to force remount of edit modal
  const [editKey, setEditKey] = useState(0);

  const { data: response, isLoading, isError } = useFaqSections();
  const { mutate: createItem } = useCreateFaqSection();
  const { mutate: updateItem } = useUpdateFaqSection();
  const { mutate: deleteItem } = useDeleteFaqSection();

  const sections = response?.data ?? [];
  const pagination = response?.pagination;

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    if (!pagination) return [];
    const totalPages = pagination.totalPages;
    const pages: (number | string)[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  // View functionality
  const onView = (item: FaqSectionType) => {
    setSelected(item);
    setIsViewOpen(true);
  };

  // Edit functionality
  const onEdit = (item: FaqSectionType) => {
    setSelected(item);
    setEditKey((prev) => prev + 1);
    setIsEditOpen(true);
  };

  // Delete functionality
  const onDelete = (id: string | undefined) => {
    if (!id) return;
    deleteItem(id, {
      onSuccess: () => toast.success("Deleted successfully"),
      onError: () => toast.error("Failed to delete"),
    });
  };

  const onAdd = () => setIsAddOpen(true);

  const handleCreate = (data: { question: string; answer: string }) => {
    createItem(data, {
      onSuccess: () => {
        toast.success("FAQ added successfully");
        setIsAddOpen(false);
      },
      onError: () => toast.error("Failed to add FAQ"),
    });
  };

  const handleSave = (id: string, data: { question: string; answer: string }) => {
    updateItem(
      { id, data },
      {
        onSuccess: () => {
          toast.success("FAQ updated successfully");
          setIsEditOpen(false);
        },
        onError: () => toast.error("Failed to update FAQ"),
      },
    );
  };

  if (isError || (response && !response.success)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <p className="text-red-500 font-medium">Error loading FAQ sections</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">FAQ Management</span>
          </nav>
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          <Button
            onClick={onAdd}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ Section
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Question
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Answer
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {sections.length > 0 ? (
                sections.map((item: FaqSectionType) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center text-gray-700 font-medium">
                      {item.question || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600 max-w-xs truncate">
                      {item.answer || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <button
                        onClick={() => onView(item)}
                        className="p-2 bg-blue-600 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 bg-green-600 hover:bg-green-600 rounded-full transition-colors cursor-pointer ml-2"
                      >
                        <Edit className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="p-2 bg-red-600 hover:bg-red-600 rounded-full transition-colors cursor-pointer ml-2"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-gray-400"
                  >
                    No FAQ sections found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {pagination && (
          <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4 border-t">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, pagination.total)}
              </span>{" "}
              of <span className="font-medium">{pagination.total}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border rounded-lg hover:bg-gray-50 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={cn(
                    "w-9 h-9 flex items-center justify-center rounded-lg font-medium transition-colors",
                    page === currentPage
                      ? "bg-[#0057B8] text-white"
                      : page === "..."
                        ? "text-gray-400 cursor-default"
                        : "border hover:bg-gray-50 text-gray-500 cursor-pointer",
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="p-2 border rounded-lg hover:bg-gray-50 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </Card>

      <FaqSectionViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        section={selected}
      />
      <FaqSectionEditModal
        key={editKey}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        section={selected}
        onSave={handleSave}
      />
      <FaqSectionAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
