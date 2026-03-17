"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AboutSection } from "../types/aboutSection.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import Image from "next/image";

interface AboutSectionEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly aboutSection: AboutSection | null;
  readonly onSave: (
    updatedAboutSection: Partial<AboutSection> & { imageFile?: File },
  ) => void;
}

export default function AboutSectionEditModal({
  isOpen,
  onClose,
  aboutSection,
  onSave,
}: AboutSectionEditModalProps) {
  const [formData, setFormData] = useState({
    title: aboutSection?.title || "",
    subtitle: aboutSection?.subtitle || "",
    descriptionTitle: aboutSection?.descriptionTitle || "",
    description: aboutSection?.description || "",
    btnName: aboutSection?.btnName || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(aboutSection?.image || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ...(imageFile ? { imageFile } : {}),
    });
    onClose();
  };

  if (!aboutSection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit About Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-bold text-gray-700"
              >
                Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Enter title"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Description Title */}
            <div className="space-y-2">
              <Label
                htmlFor="descriptionTitle"
                className="text-sm font-bold text-gray-700"
              >
                Description Title
              </Label>
              <Input
                id="descriptionTitle"
                name="descriptionTitle"
                value={formData.descriptionTitle}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter description title"
              />
            </div>

            {/* Button Name */}
            <div className="space-y-2">
              <Label
                htmlFor="btnName"
                className="text-sm font-bold text-gray-700"
              >
                Button Name
              </Label>
              <Input
                id="btnName"
                name="btnName"
                value={formData.btnName}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter button text"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[120px]"
              placeholder="Enter description"
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
                if (imagePreview && imagePreview.startsWith("blob:")) {
                  URL.revokeObjectURL(imagePreview);
                }
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                } else {
                  setImagePreview(aboutSection?.image ?? null);
                }
              }}
            />

            {/* Preview area */}
            <div
              className="border-2 border-dashed rounded-xl p-4 bg-[#F8FAFC] hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={imagePreview}
                    alt={aboutSection.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        if (imagePreview?.startsWith("blob:")) {
                          URL.revokeObjectURL(imagePreview);
                        }
                        setImagePreview(null);
                        fileInputRef.current?.click();
                      }}
                      className="bg-white/90 text-red-600 px-3 py-1.5 rounded-lg font-bold text-xs shadow-md hover:bg-white hover:scale-105 transition-all backdrop-blur-sm border border-red-100 flex items-center gap-2 cursor-pointer"
                    >
                      Change <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <p className="text-sm font-medium">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs">PNG, JPG up to ~5MB</p>
                  <Button
                    type="button"
                    className="mt-3 bg-[#0057B8] hover:bg-[#004494]"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose Image
                  </Button>
                </div>
              )}
            </div>

            {imageFile && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-info truncate">
                  Selected:{" "}
                  <span className="font-medium text-gray-700">
                    {imageFile.name}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#0057B8] hover:bg-[#004494] cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
