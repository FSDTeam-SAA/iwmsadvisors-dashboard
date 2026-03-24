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
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { useCreateMission } from "../hooks/useMissionVision";
import { toast } from "sonner";

interface MissionAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function MissionAddModal({
  isOpen,
  onClose,
}: MissionAddModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const { mutate: createMission, isPending } = useCreateMission();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview("");
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    removeImage();
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

    createMission(
      { title, description, image: imageFile ?? undefined },
      {
        onSuccess: () => {
          toast.success("Mission added successfully");
          handleClose();
        },
        onError: () => toast.error("Failed to add mission"),
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Add Mission
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="add-m-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="add-m-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Our Mission"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="add-m-description"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="add-m-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter mission description"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-700">Image</Label>
            <input
              type="file"
              id="mission-image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="flex flex-col items-center gap-4 text-center">
              <label
                htmlFor="mission-image"
                className="relative group w-full max-w-[400px] h-48 mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                aria-label="Choose Mission Image"
              >
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeImage();
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

              {imagePreview && (
                <div className="flex flex-col items-center gap-2">
                  <label
                    htmlFor="mission-image"
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

          {/* Actions */}
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
              {isPending ? "Adding..." : "Add Mission"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
