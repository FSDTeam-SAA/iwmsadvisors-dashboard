"use client";

import { useState } from "react";
import { Plus, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ContactInformation } from "../types/contactInformation.type";
import { ContactInformationCard } from "./ContactInformationCard";
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

      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0057B8]"></div>
          </div>
        ) : contactItem ? (
          <ContactInformationCard
            item={contactItem}
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
              No contact information found
            </p>
            <button
              className="text-[#0057B8] hover:underline mt-2 font-semibold cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add your contact information now
            </button>
          </div>
        )}
      </div>

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
