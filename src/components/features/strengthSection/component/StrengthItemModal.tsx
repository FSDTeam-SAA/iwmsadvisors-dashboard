"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateStrengthItem,
  useUpdateStrengthItem,
} from "../hooks/useStrengthSection";
import { StrengthItem } from "../types/strengthSection.type";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface StrengthItemModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly item: StrengthItem | null;
}

export default function StrengthItemModal({
  isOpen,
  onClose,
  item,
}: StrengthItemModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createItem, isPending: isCreating } = useCreateStrengthItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateStrengthItem();

  useEffect(() => {
    if (item && isOpen) {
      setTitle(item.title);
      setSubtitle(item.subtitle);
      setPreviewUrl(item.image);
      setImageFile(null);
    } else if (!item && isOpen) {
      setTitle("");
      setSubtitle("");
      setPreviewUrl(null);
      setImageFile(null);
    }
  }, [item, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (item) {
      updateItem(
        {
          id: item._id,
          data: { title, subtitle, image: imageFile || undefined },
        },
        { onSuccess: onClose },
      );
    } else {
      if (!imageFile) {
        alert("Please select an image");
        return;
      }
      createItem({ title, subtitle, image: imageFile }, { onSuccess: onClose });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {item ? "Edit Strength Item" : "Add New Strength Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="item-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="item-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Client Impact"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="item-subtitle" className="text-sm font-medium">
              Subtitle
            </label>
            <Input
              id="item-subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Our success is measured by the results..."
              required
            />
          </div>

          <div className="space-y-2">
            <span id="image-label" className="text-sm font-medium">
              Image
            </span>
            <button
              type="button"
              aria-labelledby="image-label"
              className="mt-1 flex w-full justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0057B8] focus:ring-offset-2"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="relative w-full aspect-video">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center font-medium">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <span className="text-[#0057B8] hover:text-[#004494]">
                      Upload a file
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              aria-label="Select image file"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#0057B8] hover:bg-[#004494]"
            >
              {isPending ? "Saving..." : item ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
