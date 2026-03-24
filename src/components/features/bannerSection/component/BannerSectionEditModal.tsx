"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BannerSection } from "../types/bannerSection.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Upload } from "lucide-react";

interface BannerSectionEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly bannerSection: BannerSection | null;
  readonly onSave: (
    updatedBannerSection: Partial<BannerSection> & { imageFile?: File },
  ) => void;
}

export default function BannerSectionEditModal({
  isOpen,
  onClose,
  bannerSection,
  onSave,
}: BannerSectionEditModalProps) {
  const [formData, setFormData] = useState({
    title: bannerSection?.title || "",
    subTitle: bannerSection?.subTitle || "",
    btn1: bannerSection?.btn1 || "",
    btn2: bannerSection?.btn2 || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    bannerSection?.image || null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Set default state when modal opens or bannerSection changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  if (!bannerSection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Banner
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
              placeholder="Enter banner title"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label
              htmlFor="subTitle"
              className="text-sm font-bold text-gray-700"
            >
              Subtitle
            </Label>
            <Input
              id="subTitle"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter subtitle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button 1 */}
            <div className="space-y-2">
              <Label htmlFor="btn1" className="text-sm font-bold text-gray-700">
                Button 1 Text
              </Label>
              <Input
                id="btn1"
                name="btn1"
                value={formData.btn1}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter button 1 text"
              />
            </div>

            {/* Button 2 */}
            <div className="space-y-2">
              <Label htmlFor="btn2" className="text-sm font-bold text-gray-700">
                Button 2 Text
              </Label>
              <Input
                id="btn2"
                name="btn2"
                value={formData.btn2}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter button 2 text"
              />
            </div>
          </div>

          {/* Image Preview and Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-bold text-gray-700">
              Image
            </Label>
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
                if (imagePreview?.startsWith("blob:")) {
                  URL.revokeObjectURL(imagePreview);
                }
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                } else {
                  setImagePreview(bannerSection?.image ?? null);
                }
              }}
            />
            <div className="border-2 border-dashed rounded-xl p-4 bg-[#F8FAFC]">
              {imagePreview ? (
                <div className="flex flex-col items-center w-full gap-4">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100 w-full">
                    <Image
                      src={imagePreview}
                      alt={bannerSection.title}
                      fill
                      className="object-cover"
                    />
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

            <div className="flex flex-col items-center gap-2">
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
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-[#0057B8] hover:bg-gray-50 hover:border-[#0057B8]/30 transition-all cursor-pointer group"
              >
                <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Change Image
              </button>
              <p className="text-xs text-gray-500">
                Click to select a different image
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 cursor-pointer"
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
