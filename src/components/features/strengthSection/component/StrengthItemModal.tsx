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
import { Label } from "@/components/ui/label";
import {
  useCreateStrengthItem,
  useUpdateStrengthItem,
} from "../hooks/useStrengthSection";
import { StrengthItem } from "../types/strengthSection.type";
import { Upload, X, Plus } from "lucide-react";
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

  // State synchronization during render
  const [prevId, setPrevId] = useState<string | null>(null);
  if (isOpen && (item?._id || null) !== prevId) {
    setPrevId(item?._id || null);
    setTitle(item?.title || "");
    setSubtitle(item?.subtitle || "");
    setPreviewUrl(item?.image || null);
    setImageFile(null);
  }

  const { mutate: createItem, isPending: isCreating } = useCreateStrengthItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateStrengthItem();


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
  const modalTitle = item ? "Edit Strength Item" : "Add New Strength Item";
  let submitButtonText = "Add Item";
  if (isPending) {
    submitButtonText = "Saving...";
  } else if (item) {
    submitButtonText = "Update Item";
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="item-title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="item-title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Client Impact"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-subtitle" className="text-sm font-medium">
              Subtitle
            </Label>
            <Input
              id="item-subtitle"
              value={subtitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubtitle(e.target.value)
              }
              placeholder="e.g. Our success is measured by the results..."
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-700">Image</Label>
            <input
              type="file"
              id="strength-item-image"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center gap-4 text-center">
              <label
                htmlFor="strength-item-image"
                className="relative group w-full max-w-[400px] h-48 mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                aria-label="Choose Strength Item Image"
              >
                {previewUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setImageFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10 shadow-sm"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <Plus className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center px-4">
                      Choose Image
                    </p>
                  </div>
                )}
              </label>

              {previewUrl && (
                <div className="flex flex-col items-center gap-2">
                  <label
                    htmlFor="strength-item-image"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-[#0057B8] hover:bg-gray-50 hover:border-[#0057B8]/30 transition-all cursor-pointer group"
                  >
                    <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Change Image
                  </label>
                  <p className="text-xs text-gray-500">
                    Click to select a different image
                  </p>
                </div>
              )}
            </div>
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
              {submitButtonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
