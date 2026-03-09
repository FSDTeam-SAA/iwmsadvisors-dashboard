"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  useStrengthSection,
  useStrengthItems,
  useDeleteStrengthItem,
} from "../hooks/useStrengthSection";
import StrengthSectionHeaderModal from "./StrengthSectionHeaderModal";
import StrengthItemModal from "./StrengthItemModal";
import Image from "next/image";
import { StrengthItem } from "../types/strengthSection.type";

export default function StrengthSection() {
  const { data: sectionResponse, isLoading: sectionLoading } =
    useStrengthSection();
  const { data: itemsResponse, isLoading: itemsLoading } = useStrengthItems();
  const { mutate: deleteItem } = useDeleteStrengthItem();

  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StrengthItem | null>(null);

  const section = sectionResponse?.data;
  const items = itemsResponse?.data || [];

  const handleEditItem = (item: StrengthItem) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this strength item?")) {
      deleteItem(id);
    }
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsItemModalOpen(true);
  };

  if (sectionLoading || itemsLoading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Loading Strength Section...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-[#F9FAFB] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Strength Section Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage the core strengths and client impact items.
          </p>
        </div>
      </div>

      {/* Main Section Heading/Subtitle Card */}
      <Card className="p-6 border-none shadow-sm rounded-xl bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Heading & Subtitle
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHeaderModalOpen(true)}
            className="text-[#0057B8] border-[#0057B8] hover:bg-blue-50 font-medium h-9"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Header
          </Button>
        </div>

        {section ? (
          <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Title
              </span>
              <p className="text-lg font-bold text-gray-800 mt-1">
                {section.title}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Subtitle
              </span>
              <p className="text-md text-gray-600 mt-1">{section.subtitle}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-100 italic text-gray-500">
            No header defined. Click &quot;Edit Header&quot; to create one.
          </div>
        )}
      </Card>

      {/* Items List Section */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-800">Strength Items</h2>
          <Button
            onClick={handleAddItem}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b last:border-0 hover:bg-transparent">
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
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center">
                      <div className="relative w-20 h-14 mx-auto bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center font-bold text-gray-700">
                      {item.title}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-500 text-sm max-w-sm truncate">
                      {item.subtitle}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
                          title="Edit Item"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-16 text-center text-gray-400 font-medium italic bg-white"
                  >
                    No strength items found. Click &quot;Add New Item&quot; to
                    begin.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Modals */}
      <StrengthSectionHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        section={section || null}
      />

      <StrengthItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
