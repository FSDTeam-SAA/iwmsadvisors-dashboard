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
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useUpdateMission } from "../hooks/useMissionVision";
import { Mission } from "../types/missionVision.type";
import { toast } from "sonner";

interface MissionEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly mission: Mission | null;
}

export default function MissionEditModal({
  isOpen,
  onClose,
  mission,
}: MissionEditModalProps) {
  const [title, setTitle] = useState(mission?.title || "");
  const [description, setDescription] = useState(mission?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(mission?.image || "");

  const { mutate: updateMission, isPending } = useUpdateMission();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview("");
  };

  const handleClose = () => {
    if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission) return;

    updateMission(
      {
        id: mission._id,
        data: {
          title,
          description,
          ...(imageFile ? { image: imageFile } : {}),
        },
      },
      {
        onSuccess: () => {
          toast.success("Mission updated successfully");
          handleClose();
        },
        onError: () => toast.error("Failed to update mission"),
      },
    );
  };

  if (!mission) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Mission
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-m-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="edit-m-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Our Mission"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-m-description"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="edit-m-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter mission description"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 text-sm transition-colors">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
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
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
