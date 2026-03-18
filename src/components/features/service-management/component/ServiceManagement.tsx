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
import { ServicePage } from "../types/service-management.types";
import {
  useServiceManagement,
  useCreateServicePage,
  useDeleteServicePage,
  useUpdateServicePage,
} from "../hooks/useServiceManagement";
import ServiceManagementAddModal from "./ServiceManagementAddModal";
import ServiceManagementEditModal from "./ServiceManagementEditModal";
import ServiceManagementViewModal from "./ServiceManagementViewModal";
import Image from "next/image";

export default function ServiceManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedService, setSelectedService] = useState<ServicePage | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
  } = useServiceManagement(currentPage, itemsPerPage);
  const { mutate: createService } = useCreateServicePage();
  const { mutate: updateService } = useUpdateServicePage();
  const { mutate: deleteService } = useDeleteServicePage();

  const services = response?.data || [];
  const pagination = response?.pagination;

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    if (!pagination) return [];
    const totalPages = pagination.totalPages;
    const pages = [];
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

  const handleView = (service: ServicePage) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const handleEdit = (service: ServicePage) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteService(id, {
      onSuccess: () => toast.success("Service page deleted successfully"),
      onError: () => toast.error("Failed to delete service page"),
    });
  };

  const handleSave = (
    updatedData: Partial<ServicePage> & {
      subtitles?: string[];
      faq?: { question: string; answer: string }[];
      imageFile?: File | null;
    },
  ) => {
    if (selectedService) {
      updateService(
        { id: selectedService._id, data: updatedData },
        {
          onSuccess: () => {
            toast.success("Service page updated successfully");
            setIsEditModalOpen(false);
          },
          onError: () => toast.error("Failed to update service page"),
        },
      );
    }
  };

  const handleCreate = (newData: {
    heading: string;
    title: string;
    subtitles: string[];
    guideline: string;
    description: string;
    faq: { question: string; answer: string }[];
    imageFile?: File | null;
  }) => {
    createService(newData, {
      onSuccess: () => {
        toast.success("Service page added successfully");
        setIsAddModalOpen(false);
      },
      onError: () => toast.error("Failed to add service page"),
    });
  };

  if (isError || (response && !response.success)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <p className="text-red-500 font-medium">Error loading service pages</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Service Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Service Management
            </span>
          </nav>
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service Page
          </Button>
        </div>
      </div>

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
                  Heading
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Date
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {services.length > 0 ? (
                services.map((service: ServicePage) => (
                  <TableRow
                    key={service._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center">
                      <div className="relative w-12 h-12 mx-auto rounded-lg overflow-hidden bg-gray-100">
                        {service.image?.url ? (
                          <Image
                            src={service.image.url}
                            alt={service.title}
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
                    <TableCell className="py-4 text-center text-gray-700 font-medium">
                      {service.title}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {service.heading}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {new Date(service.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleView(service)}
                          className="p-2 bg-[#005696] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
                        >
                          <Edit className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-gray-400"
                  >
                    No service pages found
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

      <ServiceManagementViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        servicePage={selectedService}
      />

      <ServiceManagementEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        servicePage={selectedService}
        onSave={handleSave}
      />

      <ServiceManagementAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
