"use client";

import { useState } from "react";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  useStrengthSection,
  useDeleteStrength,
} from "../hooks/useStrengthSection";
import StrengthSectionHeaderModal from "./StrengthSectionHeaderModal";
import StrengthHeaderViewModal from "./StrengthHeaderViewModal";
import { toast } from "sonner";
import { StrengthSection } from "../types/strengthSection.type";

export default function StrengthHeaderSection() {
  const { data: sectionResponse, isLoading: sectionLoading } =
    useStrengthSection();
  const { mutate: deleteSection } = useDeleteStrength();

  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState<StrengthSection | null>(null);

  const sections = sectionResponse?.data || [];

  const handleEdit = (section: StrengthSection) => {
    setSelectedSection(section);
    setIsHeaderModalOpen(true);
  };

  const handleView = (section: StrengthSection) => {
    setSelectedSection(section);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteSection(id, {
      onSuccess: () => toast.success("Strength header deleted successfully"),
      onError: () => toast.error("Failed to delete strength header"),
    });
  };

  const handleAdd = () => {
    setSelectedSection(null);
    setIsHeaderModalOpen(true);
  };

  if (sectionLoading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium bg-white rounded-xl shadow-sm border">
        Loading Strength...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {sections.length === 0 && (
          <Button
            onClick={handleAdd}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-medium shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Strength
          </Button>
        )}
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b last:border-0 hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-left pl-8">
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-left">
                  Subtitle
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.length > 0 ? (
                sections.map((section) => (
                  <TableRow
                    key={section._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-left font-medium text-gray-700 pl-8">
                      {section.title}
                    </TableCell>
                    <TableCell className="py-4 text-left text-gray-500 text-sm max-w-sm">
                      <p className="line-clamp-2">{section.subtitle}</p>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleView(section)}
                          className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleEdit(section)}
                          className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(section._id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
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
                    colSpan={3}
                    className="py-16 text-center text-gray-400 font-medium italic bg-white"
                  >
                    No strength data found.{" "}
                    {!sectionLoading && (
                      <button
                        className="text-[#0057B8] hover:underline font-medium cursor-pointer"
                        onClick={handleAdd}
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

      {/* Modals */}
      <StrengthHeaderViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        section={selectedSection}
      />
      <StrengthSectionHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        section={selectedSection}
      />
    </div>
  );
}
