"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Eye } from "lucide-react";
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
  useStrengthItems,
  useDeleteStrengthItem,
} from "../hooks/useStrengthSection";
import StrengthItemModal from "./StrengthItemModal";
import StrengthItemViewModal from "./StrengthItemViewModal";
import Image from "next/image";
import { StrengthItem } from "../types/strengthSection.type";
import { toast } from "sonner";

export default function StrengthItemsSection() {
  const { data: itemsResponse, isLoading: itemsLoading } = useStrengthItems();
  const { mutate: deleteItem } = useDeleteStrengthItem();

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StrengthItem | null>(null);

  const items = itemsResponse?.data || [];

  const handleEditItem = (item: StrengthItem) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleViewItem = (item: StrengthItem) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id, {
      onSuccess: () => toast.success("Strength item deleted successfully"),
      onError: () => toast.error("Failed to delete strength item"),
    });
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsItemModalOpen(true);
  };

  if (itemsLoading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium bg-white rounded-xl shadow-sm border">
        Loading Strength Items...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {items.length === 0 && (
          <Button
            onClick={handleAddItem}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-medium shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        )}
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
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
                      <div className="relative w-24 h-16 mx-auto bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
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
                    <TableCell className="py-4 text-center text-gray-500 text-sm max-w-sm">
                      <p className="line-clamp-2">{item.subtitle}</p>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] text-white rounded-lg shadow-sm transition-colors cursor-pointer"
                          title="View Item"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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

      <StrengthItemViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        item={selectedItem}
      />

      <StrengthItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
