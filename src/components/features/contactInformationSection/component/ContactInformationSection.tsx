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
  MapPin,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ContactInformation } from "../types/contactInformation.type";
import {
  useContactInformation,
  useCreateContactInformation,
  useUpdateContactInformation,
  useDeleteContactInformation,
} from "../hooks/useContactInformation";
import ContactInformationAddModal from "./ContactInformationAddModal";
import ContactInformationEditModal from "./ContactInformationEditModal";
import ContactInformationViewModal from "./ContactInformationViewModal";

export default function ContactInformationSection() {
  const [selectedContact, setSelectedContact] =
    useState<ContactInformation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const { data: response, isLoading, isError } = useContactInformation();
  const { mutate: createContact } = useCreateContactInformation();
  const { mutate: updateContact } = useUpdateContactInformation();
  const { mutate: deleteContact } = useDeleteContactInformation();

  // The API returns a single object in `data`
  const contactItem: ContactInformation | null = response?.data ?? null;

  const handleView = (item: ContactInformation) => {
    setSelectedContact(item);
    setIsViewModalOpen(true);
  };

  const handleEdit = (item: ContactInformation) => {
    setSelectedContact(item);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedData: Partial<ContactInformation>) => {
    updateContact(updatedData, {
      onSuccess: () => {
        toast.success("Contact information updated successfully");
        setIsEditModalOpen(false);
      },
      onError: () => toast.error("Failed to update contact information"),
    });
  };

  const handleCreate = (
    newData: Omit<ContactInformation, "_id" | "createdAt" | "updatedAt">,
  ) => {
    createContact(newData, {
      onSuccess: () => {
        toast.success("Contact information added successfully");
        setIsAddModalOpen(false);
      },
      onError: () => toast.error("Failed to add contact information"),
    });
  };

  const handleDelete = (id: string) => {
    deleteContact(id, {
      onSuccess: () => {
        toast.success("Contact information deleted successfully");
        setConfirmDeleteId(null);
      },
      onError: () => toast.error("Failed to delete contact information"),
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">
          Error loading contact information
        </p>
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
  } else if (contactItem) {
    tableContent = (
      <TableRow className="border-b last:border-0 hover:bg-gray-50 transition-colors">
        <TableCell className="py-4 text-center text-gray-700 font-medium">
          {contactItem.title}
        </TableCell>
        <TableCell className="py-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-600">
            <Mail className="w-3.5 h-3.5 text-[#0057B8]" />
            <span className="text-sm">{contactItem.email || "N/A"}</span>
          </div>
        </TableCell>
        <TableCell className="py-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-gray-600">
            <Phone className="w-3.5 h-3.5 text-[#0057B8]" />
            <span className="text-sm">{contactItem.phone || "N/A"}</span>
          </div>
        </TableCell>
        <TableCell className="py-4 text-center max-w-[220px]">
          <div className="flex items-center justify-center gap-1.5 text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-[#0057B8] shrink-0" />
            <span className="text-sm truncate">
              {contactItem.address || "N/A"}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-4 text-center">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleView(contactItem)}
              className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleEdit(contactItem)}
              className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
            >
              <Edit className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => handleDelete(contactItem._id)}
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
          No contact information found.{" "}
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
            Contact Information Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Contact Information
            </span>
          </nav>
        </div>
        {!contactItem && (
          <div className="w-full md:w-auto flex md:justify-end">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Information
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
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Email
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Phone
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Address
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
      <ContactInformationViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contactInformation={selectedContact}
      />

      <ContactInformationEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contactInformation={selectedContact}
        onSave={handleSave}
      />

      <ContactInformationAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
