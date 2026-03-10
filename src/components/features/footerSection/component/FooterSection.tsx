"use client";

import { useState } from "react";
import { Plus, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Footer,
  FooterCreateRequest,
  FooterUpdateRequest,
} from "../types/footer.type";
import {
  useFooter,
  useCreateFooter,
  useUpdateFooter,
  useDeleteFooter,
} from "../hooks/useFooter";
import { FooterCard } from "./FooterCard";
import FooterAddModal from "./FooterAddModal";
import FooterEditModal from "./FooterEditModal";
import FooterViewModal from "./FooterViewModal";

export default function FooterSection() {
  const [selectedFooter, setSelectedFooter] = useState<Footer | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useFooter();
  const { mutate: createFooter } = useCreateFooter();
  const { mutate: updateFooter } = useUpdateFooter();
  const { mutate: deleteFooter } = useDeleteFooter();

  // The API returns a single object
  const footerItem: Footer | null = response?.data ?? null;

  const handleView = (item: Footer) => {
    setSelectedFooter(item);
    setIsViewModalOpen(true);
  };

  const handleEdit = (item: Footer) => {
    setSelectedFooter(item);
    setIsEditModalOpen(true);
  };

  const handleSave = (id: string, updatedData: FooterUpdateRequest) => {
    updateFooter(
      { id, data: updatedData },
      {
        onSuccess: () => {
          toast.success("Footer updated successfully");
          setIsEditModalOpen(false);
        },
        onError: () => toast.error("Failed to update footer"),
      },
    );
  };

  const handleCreate = (newData: FooterCreateRequest) => {
    createFooter(newData, {
      onSuccess: () => {
        toast.success("Footer added successfully");
        setIsAddModalOpen(false);
      },
      onError: () => toast.error("Failed to add footer"),
    });
  };

  const handleDelete = (id: string) => {
    deleteFooter(id, {
      onSuccess: () => {
        toast.success("Footer deleted successfully");
      },
      onError: () => toast.error("Failed to delete footer"),
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading footer data</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Footer Section Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">Footer Section</span>
          </nav>
        </div>
        {!footerItem && (
          <div className="w-full md:w-auto flex md:justify-end">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Footer
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0057B8]"></div>
          </div>
        ) : footerItem ? (
          <FooterCard
            item={footerItem}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="bg-gray-50 p-4 rounded-full mb-4 text-gray-400">
              <FileText className="w-12 h-12 opacity-20" />
            </div>
            <p className="text-gray-400 text-lg font-medium">
              No footer settings found
            </p>
            <button
              className="text-[#0057B8] hover:underline mt-2 font-semibold cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add your footer settings now
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <FooterViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        footer={selectedFooter}
      />

      <FooterEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        footer={selectedFooter}
        onSave={handleSave}
      />

      <FooterAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
