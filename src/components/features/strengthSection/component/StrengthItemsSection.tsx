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
  const MAX_ITEMS = 4;
  const { data: itemsResponse, isLoading: itemsLoading } = useStrengthItems();
  const { mutate: deleteItem } = useDeleteStrengthItem();

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StrengthItem | null>(null);

  const items = itemsResponse?.data || [];
  const canAddItem = items.length < MAX_ITEMS;

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
    if (!canAddItem) {
      toast.error(`Maximum ${MAX_ITEMS} items allowed`);
      return;
    }
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
        {canAddItem && (
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
                <TableHead className="py-4 text-gray-600 font-bold text-center w-24 pl-8">
                  Image
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-left">
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
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center pl-8">
                      <div className="relative w-12 h-12 mx-auto rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shadow-sm transition-transform hover:scale-110">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <ImageIcon className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-left font-semibold text-gray-900">
                      {item.title}
                    </TableCell>
                    <TableCell className="py-4 text-left text-gray-500 text-sm max-w-sm">
                      <p className="line-clamp-2">{item.subtitle}</p>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
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
                    colSpan={4}
                    className="py-16 text-center text-gray-400 font-medium italic bg-white"
                  >
                    No items found.{" "}
                    {!itemsLoading && canAddItem && (
                      <button
                        className="text-[#0057B8] hover:underline font-medium cursor-pointer"
                        onClick={handleAddItem}
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
