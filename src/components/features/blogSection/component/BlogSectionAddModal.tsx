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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";
import Image from "next/image";

interface BlogSectionAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (newBlogSection: {
    title: string;
    subtitle?: string;
    description: string;
    imageFile?: File | null;
  }) => void;
}

export default function BlogSectionAddModal({
  isOpen,
  onClose,
  onSave,
}: BlogSectionAddModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, imageFile });
    // Reset form after submission
    setFormData({
      title: "",
      subtitle: "",
      description: "",
    });
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      title: "",
      subtitle: "",
      description: "",
    });
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Add Blog Post
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-bold text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter blog title"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label
              htmlFor="subtitle"
              className="text-sm font-bold text-gray-700"
            >
              Subtitle
            </Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter subtitle"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Image</Label>
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                } else {
                  setImagePreview(null);
                }
              }}
            />

            <div className="flex flex-col items-center gap-4 text-center">
              <label
                htmlFor="image"
                className="relative group w-full max-w-[400px] h-48 mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                aria-label="Choose Blog Image"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Selected image preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <Plus className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center px-4">
                      Choose Image
                    </p>
                  </div>
                )}
              </label>

              {imagePreview && (
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-[#0057B8] hover:bg-gray-50 hover:border-[#0057B8]/30 transition-all cursor-pointer group"
                  >
                    <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Change Image
                  </button>
                  <p className="text-xs text-gray-500">
                    Click to select a different image
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-bold text-gray-700"
            >
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full resize-none"
              placeholder="Enter blog content/description"
            />
          </div>

          {/* Action Buttons */}
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
              className="px-6 bg-[#0057B8] hover:bg-[#004494]"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
