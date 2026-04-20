"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpdateIwmsSolutionsSection } from "../hooks/useIwmsSolutionsSection";
import { IwmsSolutionsSection } from "../types/iwmsSolutionsSection.type";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { isAxiosError } from "axios";

interface IwmsSolutionsSectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  iwmsSolutionsSection: IwmsSolutionsSection | null;
}

interface ModalItem {
  order: number;
  title: string;
  description: string;
  iconFile: File | null;
  preview: string;
  id: string;
}

export default function IwmsSolutionsSectionEditModal({
  isOpen,
  onClose,
  iwmsSolutionsSection,
}: IwmsSolutionsSectionEditModalProps) {
  const [title, setTitle] = useState(iwmsSolutionsSection?.title || "");
  const [subtitle, setSubtitle] = useState(iwmsSolutionsSection?.subtitle || "");
  const [order, setOrder] = useState(iwmsSolutionsSection?.order || 1);

  const [items, setItems] = useState<ModalItem[]>(() => {
    if (iwmsSolutionsSection?.items && Array.isArray(iwmsSolutionsSection.items) && iwmsSolutionsSection.items.length > 0) {
      return iwmsSolutionsSection.items.map((apiItem) => ({
        order: apiItem.order || 0,
        title: apiItem.title || "",
        description: apiItem.description || "",
        iconFile: null as File | null,
        preview: apiItem.icon || "",
        id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      })).sort((a, b) => a.order - b.order);
    }
    return [
      {
        order: 1,
        title: "",
        description: "",
        iconFile: null as File | null,
        preview: "",
        id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      }
    ];
  });

  const { mutate: updateSection, isPending } = useUpdateIwmsSolutionsSection();

  const handleAddItem = () => {
    const nextOrder = items.length > 0 ? Math.max(...items.map((i) => Number(i.order) || 0)) + 1 : 1;
    setItems([
      ...items,
      {
        order: nextOrder,
        title: "",
        description: "",
        iconFile: null,
        preview: "",
        id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    if (newItems[index].preview && newItems[index].preview.startsWith("blob:")) {
      URL.revokeObjectURL(newItems[index].preview);
    }
    newItems.splice(index, 1);
    setItems(newItems);
  };



  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newItems = [...items];
      newItems[index].iconFile = file;
      newItems[index].preview = URL.createObjectURL(file);
      setItems(newItems);
    }
  };

  const removeImage = (index: number) => {
    const newItems = [...items];
    if (
      newItems[index].iconFile &&
      newItems[index].preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(newItems[index].preview);
    }
    newItems[index].iconFile = null;
    newItems[index].preview = "";
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!iwmsSolutionsSection) return;

    if (!title) {
      toast.error("Title is required");
      return;
    }

    const cleanedItems = items.map((item) => ({
      order: item.order,
      title: item.title,
      description: item.description,
    }));

    const payloadData: Record<string, string | number | object | File | undefined> = {
      order,
      title,
      subtitle,
      items: cleanedItems,
    };

    items.forEach((item, index) => {
      if (item.iconFile) {
        payloadData[`icon_${index + 1}`] = item.iconFile;
      }
    });

    updateSection(
      {
        id: iwmsSolutionsSection._id,
        data: payloadData,
      },
      {
        onSuccess: () => {
          toast.success(`${title} section updated successfully`);
          onClose();
        },
        onError: (error) => {
          const errorMessage =
            (isAxiosError(error) && error.response?.data?.message) ||
            "Failed to update IwmsSolutions section";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit IWMS Solutions Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Section Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Why Choose Us"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Section Order (1-4)
              </label>
              <Input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number.parseInt(e.target.value))}
                min={1}
                max={4}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Section Subtitle
              </label>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Your trusted partner"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-medium text-lg">Items</h3>
              <Button type="button" onClick={handleAddItem} variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 cursor-pointer font-semibold">
                + Add Item
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="relative border p-4 rounded-lg bg-gray-50 space-y-3"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-sm text-[#0057B8]">Item Sequence</h4>
                    <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-md cursor-pointer transition-colors shadow-sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">
                      Order Number
                    </label>
                    <Input
                      type="number"
                      value={item.order}
                      onChange={(e) => handleItemChange(index, "order", e.target.value)}
                      placeholder="e.g. 1"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">
                      Item Title
                    </label>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        handleItemChange(index, "title", e.target.value)
                      }
                      placeholder="Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">
                      Item Description
                    </label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      placeholder="Description"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">
                      Icon Image
                    </label>
                    <div className="mt-1 flex items-center gap-4">
                      {item.preview ? (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                          <Image
                            src={item.preview}
                            alt={`Icon ${item.order}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : null}

                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 text-sm">
                          <Upload className="w-4 h-4 text-gray-500" />
                          <span>
                            {item.preview ? "Change Icon" : "Upload Icon"}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(index, e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0057B8] text-white hover:bg-[#004494]"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
