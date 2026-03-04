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
import { AboutSection as AboutSectionType } from "../types/aboutSection.type";
import {
  useAboutSections,
  useCreateAboutSection,
  useDeleteAboutSection,
  useUpdateAboutSection,
} from "../hooks/useAboutSection";
import AboutSectionAddModal from "./AboutSectionAddModal";
import AboutSectionEditModal from "./AboutSectionEditModal";
import AboutSectionViewModal from "./AboutSectionViewModal";
import Image from "next/image";

export default function AboutSection() {
  const [selectedAbout, setSelectedAbout] = useState<AboutSectionType | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useAboutSections();
  const { mutate: createAbout } = useCreateAboutSection();
  const { mutate: updateAbout } = useUpdateAboutSection();
  const { mutate: deleteAbout } = useDeleteAboutSection();

  // Handle case where data might be a single object or an array
  const aboutItems = response?.data
    ? Array.isArray(response.data)
      ? response.data
      : [response.data]
    : [];

  const handleView = (about: AboutSectionType) => {
    setSelectedAbout(about);
    setIsViewModalOpen(true);
  };

  const handleEdit = (about: AboutSectionType) => {
    setSelectedAbout(about);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      deleteAbout(id, {
        onSuccess: () => toast.success("Section deleted successfully"),
        onError: () => toast.error("Failed to delete section"),
      });
    }
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

  if (isError || (response && response.status === false)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading about sections</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Management</h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">About Management</span>
          </nav>
        </div>
        {/* <div className="w-full md:w-auto flex md:justify-end">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div> */}
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
                  Subtitle
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Des. Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {aboutItems.length > 0 ? (
                aboutItems.map((item: AboutSectionType) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center">
                      <div className="relative w-12 h-12 mx-auto rounded-lg overflow-hidden bg-gray-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
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
                      {item.title}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600 max-w-[200px] truncate">
                      {item.subtitle || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600 max-w-[200px] truncate">
                      {item.descriptionTitle || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
                        >
                          <Edit className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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
                    No about sections found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

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
