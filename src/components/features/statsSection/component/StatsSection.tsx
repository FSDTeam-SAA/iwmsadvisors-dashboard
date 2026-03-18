"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Eye, Trash2, Edit, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useStatsSections,
  useDeleteStatsSection,
} from "../hooks/useStatsSection";
import { StatsSection as StatsSectionType } from "../types/statsSection.type";
import StatsSectionAddModal from "./StatsSectionAddModal";
import StatsSectionEditModal from "./StatsSectionEditModal";
import StatsSectionViewModal from "./StatsSectionViewModal";

export default function StatsSection() {
  const [selectedStats, setSelectedStats] = useState<StatsSectionType | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useStatsSections();
  const { mutate: deleteSection } = useDeleteStatsSection();

  const statsSections = response?.data || [];

  const handleView = (section: StatsSectionType) => {
    setSelectedStats(section);
    setIsViewModalOpen(true);
  };

  const handleEdit = (section: StatsSectionType) => {
    setSelectedStats(section);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteSection(id, {
      onSuccess: () => toast.success("Stats section deleted successfully"),
      onError: () => toast.error("Failed to delete stats section"),
    });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading stats sections</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Our Proven Result</h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">Our Proven Result</span>
          </nav>
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          {statsSections.length === 0 && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Stats Section
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-left pl-8">
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-left">
                  Subtitle
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Items
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center pl-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {statsSections.length > 0 ? (
                statsSections.map((item: StatsSectionType) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-left text-gray-700 font-medium pl-8">
                      {item.title}
                    </TableCell>
                    <TableCell className="py-4 text-left text-gray-500 text-sm max-w-[300px] truncate">
                      {item.subtitle || "—"}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {item.items?.length || 0} items
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-600 hover:bg-red-500 rounded-full transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-16 text-center text-gray-400 italic bg-white"
                  >
                    No stats sections found.{" "}
                    {!isLoading && (
                      <button
                        className="text-[#0057B8] hover:underline font-medium cursor-pointer"
                        onClick={() => setIsAddModalOpen(true)}
                      >
                        Add one now
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <StatsSectionViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        statsSection={selectedStats}
      />

      <StatsSectionEditModal
        key={selectedStats?._id || "edit-modal"}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStats(null);
        }}
        statsSection={selectedStats}
      />

      <StatsSectionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
