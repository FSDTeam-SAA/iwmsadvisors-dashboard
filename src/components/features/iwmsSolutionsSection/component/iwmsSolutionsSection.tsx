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
import { Trash2, Edit, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IwmsSolutionsSection as IwmsSolutionsSectionType } from "../types/iwmsSolutionsSection.type";
import {
  useIwmsSolutionsSections,
  useDeleteIwmsSolutionsSection,
} from "../hooks/useIwmsSolutionsSection";
import IwmsSolutionsSectionAddModal from "./iwmsSolutionsSectionAddModal";
import IwmsSolutionsSectionEditModal from "./iwmsSolutionsSectionEditModal";

export default function IwmsSolutionsSection() {
  const [selectedSection, setSelectedSection] =
    useState<IwmsSolutionsSectionType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useIwmsSolutionsSections();
  const { mutate: deleteSection } = useDeleteIwmsSolutionsSection();

  let sectionItems: IwmsSolutionsSectionType[] = [];
  if (response?.data) {
    if (Array.isArray(response.data)) {
      sectionItems = response.data;
    } else {
      sectionItems = [response.data];
    }
  }

  const handleEdit = (section: IwmsSolutionsSectionType) => {
    setSelectedSection(section);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (globalThis.confirm("Are you sure you want to delete this section?")) {
      deleteSection(id, {
        onSuccess: () => toast.success("Section deleted successfully"),
        onError: () => toast.error("Failed to delete section"),
      });
    }
  };

  if (isError || response?.status === false) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">
          Error loading IWMS Solutions sections
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            IwmsSolutionsSection Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              IwmsSolutionsSection Management
            </span>
          </nav>
        </div>
        {!sectionItems.length && (
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

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Subtitle
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Items Count
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {sectionItems.length > 0 ? (
                sectionItems.map((item: IwmsSolutionsSectionType) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center text-gray-700 font-medium whitespace-nowrap">
                      {item.title}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600 max-w-[300px] truncate">
                      {item.subtitle || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {item.items?.length || 0}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
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
                    colSpan={4}
                    className="py-10 text-center text-gray-400"
                  >
                    No IWMS Solutions sections found.{" "}
                    <button
                      className="text-[#0057B8] hover:underline font-medium cursor-pointer"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      Add one now
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {isAddModalOpen && (
        <IwmsSolutionsSectionAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <IwmsSolutionsSectionEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          iwmsSolutionsSection={selectedSection}
        />
      )}
    </div>
  );
}
