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
import { Upload, X } from "lucide-react";
import { useCreateTransformSection } from "../hooks/useTransforming";
import { toast } from "sonner";

interface TransformAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function TransformAddModal({
  isOpen,
  onClose,
}: TransformAddModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    image1: null,
    image2: null,
    image3: null,
  });

  const fileInputRefs = {
    image1: useRef<HTMLInputElement>(null),
    image2: useRef<HTMLInputElement>(null),
    image3: useRef<HTMLInputElement>(null),
  };

  const { mutate: createTransform, isPending } = useCreateTransformSection();

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof imageFiles,
  ) => {
    const file = e.target.files?.[0] || null;
    setImageFiles((prev) => ({ ...prev, [key]: file }));

    if (previews[key]) URL.revokeObjectURL(previews[key]!);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [key]: url }));
    } else {
      setPreviews((prev) => ({ ...prev, [key]: null }));
    }
  };

  const removeImage = (key: keyof typeof imageFiles) => {
    setImageFiles((prev) => ({ ...prev, [key]: null }));
    if (previews[key]) URL.revokeObjectURL(previews[key]!);
    setPreviews((prev) => ({ ...prev, [key]: null }));
    if (fileInputRefs[key].current) fileInputRefs[key].current.value = "";
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFiles({ image1: null, image2: null, image3: null });
    setPreviews({ image1: null, image2: null, image3: null });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    createTransform(
      {
        title,
        description,
        image1: imageFiles.image1,
        image2: imageFiles.image2,
        image3: imageFiles.image3,
      },
      {
        onSuccess: () => {
          toast.success("Transform section added successfully");
          handleClose();
        },
        onError: () => toast.error("Failed to add transform section"),
      },
    );
  };

  const renderImageUpload = (key: keyof typeof imageFiles, label: string) => (
    <div className="space-y-2">
      <Label className="text-sm font-bold text-gray-700">{label}</Label>
      <input
        type="file"
        ref={fileInputRefs[key]}
        onChange={(e) => handleFileChange(e, key)}
        accept="image/*"
        className="hidden"
      />

      <div
        className="relative border-2 border-dashed rounded-xl p-4 bg-[#F8FAFC] hover:bg-gray-50 transition-colors cursor-pointer min-h-[160px] flex items-center justify-center"
        onClick={() => fileInputRefs[key].current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            fileInputRefs[key].current?.click();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {previews[key] ? (
          <div className="relative w-full h-32">
            <Image
              src={previews[key]!}
              alt={label}
              fill
              className="object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(key);
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Upload className="w-8 h-8 mb-2" />
            <p className="text-xs">Click to upload {label}</p>
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
            Add Transform Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="add-transform-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="add-transform-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="add-transform-desc"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="add-transform-desc"
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
              {isPending ? "Adding..." : "Add Transform Section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
