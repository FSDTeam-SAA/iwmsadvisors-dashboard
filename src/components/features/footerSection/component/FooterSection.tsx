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
  Eye,
  Edit,
  Plus,
  ChevronRight,
  Mail,
  Phone,
  Copyright,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

  let tableContent: React.ReactNode;
  if (isLoading) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={5} className="py-10 text-center text-gray-400">
          Loading...
        </TableCell>
      </TableRow>
    );
  } else if (footerItem) {
    tableContent = (
      <TableRow className="border-b last:border-0 hover:bg-gray-50 transition-colors">
        {/* Email */}
        <TableCell className="py-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-600">
            <Mail className="w-3.5 h-3.5 text-[#0057B8]" />
            <span className="text-sm">{footerItem.email || "N/A"}</span>
          </div>
        </TableCell>

        {/* Phone */}
        <TableCell className="py-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-600">
            <Phone className="w-3.5 h-3.5 text-[#0057B8]" />
            <span className="text-sm">{footerItem.phone || "N/A"}</span>
          </div>
        </TableCell>

        {/* Copyright */}
        <TableCell className="py-4 text-center max-w-[240px]">
          <div className="flex items-center justify-center gap-1.5 text-gray-600">
            <Copyright className="w-3.5 h-3.5 text-[#0057B8] shrink-0" />
            <span className="text-sm truncate">
              {footerItem.copyright || "N/A"}
            </span>
          </div>
        </TableCell>

        {/* Links count */}
        <TableCell className="py-4 text-center text-sm text-gray-600">
          {(footerItem.quickLinks?.length ?? 0) +
            (footerItem.consultingLinks?.length ?? 0) +
            (footerItem.contactLinks?.length ?? 0)}{" "}
          links
        </TableCell>

        {/* Actions */}
        <TableCell className="py-4 text-center">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleView(footerItem)}
              className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleEdit(footerItem)}
              className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
            >
              <Edit className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleDelete(footerItem._id)}
              className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </TableCell>
      </TableRow>
    );
  } else {
    tableContent = (
      <TableRow>
        <TableCell colSpan={5} className="py-10 text-center text-gray-400">
          No footer found.{" "}
          <button
            className="text-[#0057B8] hover:underline font-medium"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add one now
          </button>
        </TableCell>
      </TableRow>
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

      {/* Table Card */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Email
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Phone
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Copyright
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Nav Links
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
