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
import { useCreateHeroSection } from "../hooks/useHeroSection";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface HeroSectionAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeroSectionAddModal({
  isOpen,
  onClose,
}: HeroSectionAddModalProps) {
  const [order, setOrder] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const { mutate: createSection, isPending } = useCreateHeroSection();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImageFile(null);
    setPreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required");
      return;
    }

    if (!imageFile) {
      toast.error("Image is required");
      return;
    }

    createSection(
      {
        order,
        title,
        subtitle,
        image: imageFile,
      },
      {
        onSuccess: () => {
          toast.success("Hero section created successfully");
          onClose();
          // Reset form state is handled by unmounting or the parent component
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Failed to create hero section";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Hero Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="order"
                className="text-sm font-medium text-gray-700"
              >
                Order
              </label>
              <Input
                id="order"
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                min={1}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Welcome to IWMS"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subtitle"
                className="text-sm font-medium text-gray-700"
              >
                Subtitle
              </label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Your trusted enterprise advisor"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Hero Image
              </label>
              <div className="mt-1 flex flex-col gap-4">
                {preview ? (
                  <div className="relative w-full h-48 rounded-md overflow-hidden border">
                    <Image
                      src={preview}
                      alt="Hero preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <Upload className="w-8 h-8 mb-2" />
                    <p className="text-sm">No image selected</p>
                  </div>
                )}

                <label className="cursor-pointer max-w-fit">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium">
                    <Upload className="w-4 h-4 text-gray-500" />
                    <span>{preview ? "Change Image" : "Upload Image"}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0057B8] text-white hover:bg-[#004494] cursor-pointer"
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
