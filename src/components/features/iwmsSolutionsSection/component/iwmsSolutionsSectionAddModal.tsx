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
import { useCreateIwmsSolutionsSection } from "../hooks/useIwmsSolutionsSection";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface IwmsSolutionsSectionAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IwmsSolutionsSectionAddModal({
  isOpen,
  onClose,
}: IwmsSolutionsSectionAddModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [order, setOrder] = useState(1);

  const [items, setItems] = useState([
    {
      order: 1,
      title: "",
      description: "",
      iconFile: null as File | null,
      preview: "",
    },
    {
      order: 2,
      title: "",
      description: "",
      iconFile: null as File | null,
      preview: "",
    },
    {
      order: 3,
      title: "",
      description: "",
      iconFile: null as File | null,
      preview: "",
    },
    {
      order: 4,
      title: "",
      description: "",
      iconFile: null as File | null,
      preview: "",
    },
  ]);

  const { mutate: createSection, isPending } = useCreateIwmsSolutionsSection();

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
    if (newItems[index].preview) {
      URL.revokeObjectURL(newItems[index].preview);
    }
    newItems[index].iconFile = null;
    newItems[index].preview = "";
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required");
      return;
    }

    const cleanedItems = items.map((item) => ({
      order: item.order,
      title: item.title,
      description: item.description,
    }));

    createSection(
      {
        order,
        title,
        subtitle,
        items: cleanedItems,
        icon_1: items[0].iconFile || undefined,
        icon_2: items[1].iconFile || undefined,
        icon_3: items[2].iconFile || undefined,
        icon_4: items[3].iconFile || undefined,
      },
      {
        onSuccess: () => {
          toast.success("IwmsSolutions section created successfully");
          onClose();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            "Failed to create IwmsSolutions section";
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
            Add IwmsSolutions Section
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
                Section Order (1-3)
              </label>
              <Input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number.parseInt(e.target.value))}
                min={1}
                max={3}
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
            <h3 className="font-medium text-lg border-b pb-2">
              Items (Min 1, Max 4)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div
                  key={item.order}
                  className="border p-4 rounded-lg bg-gray-50 space-y-3"
                >
                  <h4 className="font-semibold text-sm">Item {item.order}</h4>

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
              {isPending ? "Creating..." : "Create Section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
