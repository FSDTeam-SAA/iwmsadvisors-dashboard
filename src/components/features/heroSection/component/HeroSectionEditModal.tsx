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
import { useUpdateHeroSection } from "../hooks/useHeroSection";
import { HeroSection } from "../types/heroSection.type";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface HeroSectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroSection: HeroSection | null;
}

export default function HeroSectionEditModal({
  isOpen,
  onClose,
  heroSection,
}: HeroSectionEditModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const { mutate: updateSection, isPending } = useUpdateHeroSection();

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevHeroSection, setPrevHeroSection] = useState(heroSection);

  if (isOpen !== prevIsOpen || heroSection !== prevHeroSection) {
    setPrevIsOpen(isOpen);
    setPrevHeroSection(heroSection);

    if (isOpen && heroSection) {
      setTitle(heroSection.title || "");
      setSubtitle(heroSection.subtitle || "");
      setPreview(heroSection.image || "");
      setImageFile(null); // Reset pending file
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setImageFile(null);
    setPreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!heroSection) return;

    if (!title) {
      toast.error("Title is required");
      return;
    }

    updateSection(
      {
        id: heroSection._id,
        data: {
          title,
          subtitle,
          image: imageFile || undefined, // Only send file if changed
        },
      },
      {
        onSuccess: () => {
          toast.success("Hero section updated successfully");
          onClose();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Failed to update hero section";
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
            Edit Hero Section
          </DialogTitle>
        </DialogHeader>

        {heroSection && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Order (Cannot be edited)
                </label>
                <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-600 font-medium">
                  {heroSection.order}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Welcome to IWMS"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-subtitle"
                  className="text-sm font-medium text-gray-700"
                >
                  Subtitle
                </label>
                <Input
                  id="edit-subtitle"
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
                      <span>
                        {preview ? "Change Image" : "Upload New Image"}
                      </span>
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
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#0057B8] text-white hover:bg-[#004494]"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
