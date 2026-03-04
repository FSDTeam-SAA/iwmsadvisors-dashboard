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
import Image from "next/image";

interface BannerSectionAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (newBannerSection: {
    title: string;
    subTitle?: string;
    btn1?: string;
    btn2?: string;
    imageFile?: File | null;
  }) => void;
}

export default function BannerSectionAddModal({
  isOpen,
  onClose,
  onSave,
}: BannerSectionAddModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    btn1: "",
    btn2: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, imageFile });
    // Reset form after submission
    setFormData({
      title: "",
      subTitle: "",
      btn1: "",
      btn2: "",
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
      subTitle: "",
      btn1: "",
      btn2: "",
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
            Add Banner
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

            {/* Preview area */}
            <div
              className="border-2 border-dashed rounded-xl p-4 bg-[#F8FAFC] hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={imagePreview}
                    alt="Selected image preview"
                    fill
                    className="object-cover"
                  />
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
                <p className="text-xs text-gray-500 truncate">
                  {imageFile.name}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setImageFile(null);
                    if (imagePreview) {
                      URL.revokeObjectURL(imagePreview);
                      setImagePreview(null);
                    }
                  }}
                  className="h-8"
                >
                  Remove
                </Button>
              </div>
            )}
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
