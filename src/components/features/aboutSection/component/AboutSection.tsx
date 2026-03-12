"use client";

import { useState } from "react";
import { Plus, ChevronRight, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AboutSection as AboutSectionType } from "../types/aboutSection.type";
import { AboutCard } from "./AboutCard";
import {
  useAboutSections,
  useCreateAboutSection,
  useDeleteAboutSection,
  useUpdateAboutSection,
} from "../hooks/useAboutSection";
import AboutSectionAddModal from "./AboutSectionAddModal";
import AboutSectionEditModal from "./AboutSectionEditModal";
import AboutSectionViewModal from "./AboutSectionViewModal";

export default function AboutSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const [selectedAbout, setSelectedAbout] = useState<AboutSectionType | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isError } = useAboutSections();
  const { mutate: createAbout } = useCreateAboutSection();
  const { mutate: updateAbout } = useUpdateAboutSection();
  const { mutate: deleteAbout } = useDeleteAboutSection();

  // Handle case where data might be a single object or an array
  let aboutItems: AboutSectionType[] = [];
  if (response?.data) {
    if (Array.isArray(response.data)) {
      aboutItems = response.data;
    } else {
      aboutItems = [response.data];
    }
  }

  const handleView = (about: AboutSectionType) => {
    setSelectedAbout(about);
    setIsViewModalOpen(true);
  };

  const handleEdit = (about: AboutSectionType) => {
    setSelectedAbout(about);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteAbout(id, {
      onSuccess: () => toast.success("Section deleted successfully"),
      onError: () => toast.error("Failed to delete section"),
    });
  };

  const handleSave = (
    updatedData: Partial<AboutSectionType> & { imageFile?: File },
  ) => {
    if (selectedAbout) {
      updateAbout(
        { id: selectedAbout._id, data: updatedData },
        {
          onSuccess: () => {
            toast.success("Section updated successfully");
            setIsEditModalOpen(false);
          },
          onError: () => toast.error("Failed to update section"),
        },
      );
    }
  };

  const handleCreate = (newData: {
    title: string;
    subtitle: string;
    descriptionTitle: string;
    description: string;
    btnName: string;
    imageFile?: File | null;
  }) => {
    const { imageFile, ...rest } = newData;
    createAbout(
      { ...rest, imageFile: imageFile || undefined },
      {
        onSuccess: () => {
          toast.success("Section added successfully");
          setIsAddModalOpen(false);
        },
        onError: () => toast.error("Failed to add section"),
      },
    );
  };

  if (isError || response?.status === false) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading about sections</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      {showHeader && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              About Management
            </h1>
            <nav className="flex items-center text-sm text-gray-500 mt-1">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-gray-900 font-medium">
                About Management
              </span>
            </nav>
          </div>
          {!aboutItems.length && (
            <div className="w-full md:w-auto flex md:justify-end">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {aboutItems.length > 0 ? (
          aboutItems.map((item: AboutSectionType) => (
            <AboutCard
              key={item._id}
              item={item}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="bg-gray-50 p-4 rounded-full mb-4 text-gray-400">
              <FileImage className="w-12 h-12 opacity-20" />
            </div>
            <p className="text-gray-400 text-lg font-medium">
              No about sections found
            </p>
            <button
              className="text-[#0057B8] hover:underline mt-2 font-semibold cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add your first about section
            </button>
          </div>
        )}
      </div>

      <AboutSectionViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        aboutSection={selectedAbout}
      />

      <AboutSectionEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        aboutSection={selectedAbout}
        onSave={handleSave}
      />

      <AboutSectionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
