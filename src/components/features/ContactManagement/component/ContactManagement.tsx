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
import { ChevronLeft, ChevronRight, Eye, Trash2 } from "lucide-react";
import {
  useContactManagement,
  useDeleteContact,
} from "../hooks/useContactManagement";
import MessageDetailsModal from "../../dashboard/component/Overview/MessageDetailsModal";
import { Contact } from "../types/contactManagement.types";
import { cn } from "@/lib/utils";
// import { deleteContactApi } from "../api/contactManagement.api";
import { toast } from "sonner";

export default function ContactManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const {
    data: response,
    isLoading,
    isError,
    // isPlaceholderData,
  } = useContactManagement(currentPage, itemsPerPage);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contacts = response?.data || [];
  const pagination = response?.pagination;

  const handleOpenModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (!pagination) return [];
    const totalPages = pagination.totalPages;
    const pages = [];

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const { mutate: deleteContact } = useDeleteContact();

  // delete contact
  const handleDelete = (id: string) => {
    deleteContact(id, {
      onSuccess: () => {
        toast.success("Contact deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete contact");
      },
    });
  };

  if (isError || (response && !response.success)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <p className="text-red-500 font-medium">Error loading contacts</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Contact Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Contact Management
            </span>
          </nav>
        </div>

        {/* Filters */}
        {/* <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Date Range</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <Filter className="w-4 h-4 text-gray-400" />
            <span>Service Name</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div> */}
      </div>

      {/* Table Section */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Client Name
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Email
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Phone Number
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Service Name
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <TableRow
                    key={contact._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center text-gray-700 font-medium whitespace-nowrap">
                      {contact.firstName} {contact.lastName}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {contact.email}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {contact.phone}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {contact.service}
                    </TableCell>
                    <TableCell className=" py-4 text-center">
                      <button
                        onClick={() => handleOpenModal(contact)}
                        className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors cursor-pointer ml-2"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-gray-400"
                  >
                    No contacts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
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

      <MessageDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={selectedContact}
      />
    </div>
  );
}
