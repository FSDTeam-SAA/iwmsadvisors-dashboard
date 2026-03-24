"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Upload, X, Plus } from "lucide-react";
import { useUpdateTransformSection } from "../hooks/useTransforming";
import { TransformSection } from "../types/transforming.type";
import { toast } from "sonner";

interface TransformEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly transformSection: TransformSection | null;
}

export default function TransformEditModal({
  isOpen,
  onClose,
  transformSection,
}: TransformEditModalProps) {
  const [title, setTitle] = useState(transformSection?.title || "");
  const [description, setDescription] = useState(
    transformSection?.description || "",
  );

  const [imageFiles, setImageFiles] = useState<{
    image1: File | null;
    image2: File | null;
    image3: File | null;
  }>({
    image1: null,
    image2: null,
    image3: null,
  });

  const [previews, setPreviews] = useState<{
    image1: string | null;
    image2: string | null;
    image3: string | null;
  }>({
    image1: transformSection?.image1 || null,
    image2: transformSection?.image2 || null,
    image3: transformSection?.image3 || null,
  });

  const fileInputRefs = {
    image1: useRef<HTMLInputElement>(null),
    image2: useRef<HTMLInputElement>(null),
    image3: useRef<HTMLInputElement>(null),
  };

  const { mutate: updateTransform, isPending } = useUpdateTransformSection();

  useEffect(() => {
    return () => {
      // Only revoke blob URLs, not existing image URLs
      Object.values(previews).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof imageFiles,
  ) => {
    const file = e.target.files?.[0] || null;
    setImageFiles((prev) => ({ ...prev, [key]: file }));

    if (previews[key]?.startsWith("blob:")) URL.revokeObjectURL(previews[key]!);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [key]: url }));
    } else {
      setPreviews((prev) => ({
        ...prev,
        [key]: transformSection?.[key] || null,
      }));
    }
  };

  const removeImage = (key: keyof typeof imageFiles) => {
    setImageFiles((prev) => ({ ...prev, [key]: null }));
    if (previews[key]?.startsWith("blob:")) URL.revokeObjectURL(previews[key]!);
    setPreviews((prev) => ({ ...prev, [key]: null }));
    if (fileInputRefs[key].current) fileInputRefs[key].current.value = "";
  };

  const handleClose = () => {
    setImageFiles({ image1: null, image2: null, image3: null });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transformSection) return;
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    updateTransform(
      {
        id: transformSection._id,
        data: {
          title,
          description,
          image1: imageFiles.image1,
          image2: imageFiles.image2,
          image3: imageFiles.image3,
        },
      },
      {
        onSuccess: () => {
          toast.success("Transform section updated successfully");
          handleClose();
        },
        onError: () => toast.error("Failed to update transform section"),
      },
    );
  };

  const renderImageUpload = (key: keyof typeof imageFiles, label: string) => (
    <div className="space-y-2">
      <Label className="text-sm font-bold text-gray-700">{label}</Label>
      <input
        type="file"
        id={key}
        ref={fileInputRefs[key]}
        onChange={(e) => handleFileChange(e, key)}
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <label
          htmlFor={key}
          className="relative group w-full h-48 mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
          aria-label={`Choose ${label}`}
        >
          {previews[key] ? (
            <div className="relative w-full h-full">
              <Image
                src={previews[key]}
                alt={label}
                fill
                className="object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeImage(key);
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <Plus className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center px-4">
                Choose {label}
              </p>
            </div>
          )}
        </label>

        {previews[key] && (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRefs[key].current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-[#0057B8] hover:bg-gray-50 hover:border-[#0057B8]/30 transition-all cursor-pointer group"
            >
              <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Change Image
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Transform Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="edit-transform-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="edit-transform-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="edit-transform-desc"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="edit-transform-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderImageUpload("image1", "Image 1")}
            {renderImageUpload("image2", "Image 2")}
            {renderImageUpload("image3", "Image 3")}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#0057B8] hover:bg-[#004494] cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
