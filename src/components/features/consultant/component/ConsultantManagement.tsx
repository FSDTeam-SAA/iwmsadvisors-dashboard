// src/components/features/consultant/component/ConsultantManagement.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useConsultants, useDeleteConsultant } from "../hooks/useConsultant";
import { Consultant as ConsultantType } from "../types/consultant.type";
import { ConsultantCard } from "./ConsultantCard";
import ConsultantAddModal from "./ConsultantAddModal";
import ConsultantEditModal from "./ConsultantEditModal";

export default function ConsultantManagement() {
  const [selectedConsultant, setSelectedConsultant] = useState<ConsultantType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useConsultants();
  const { mutate: deleteConsultant } = useDeleteConsultant();

  const consultants = response?.data || [];

  const handleEdit = (consultant: ConsultantType) => {
    setSelectedConsultant(consultant);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this consultant?")) {
      deleteConsultant(id, {
        onSuccess: () => toast.success("Consultant deleted successfully"),
        onError: () => toast.error("Failed to delete consultant"),
      });
    }
  };

  let content;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#0057B8]" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading consultants</p>
      </div>
    );
  } else if (consultants.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultants.map((consultant) => (
          <ConsultantCard
            key={consultant._id}
            consultant={consultant}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 bg-white rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-400 italic">No consultants found.</p>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="outline"
          className="text-[#0057B8] border-[#0057B8] hover:bg-blue-50"
        >
          Add your first consultant
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultant Management</h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">Consultant Management</span>
          </nav>
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          {consultants.length === 0 && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Consultant
            </Button>
          )}
        </div>
      </div>

      {content}

      <ConsultantAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {selectedConsultant && (
        <ConsultantEditModal
          key={selectedConsultant._id}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedConsultant(null);
          }}
          consultant={selectedConsultant}
        />
      )}
    </div>
  );
}
