// src/components/features/Expertise/component/ExpertiseEditModal.tsx

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
import { useUpdateExpertise } from "../hooks/useExpertise";
import { Expertise } from "../types/expertise.type";
import { toast } from "sonner";

interface ExpertiseEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly expertise: Expertise | null;
}

export default function ExpertiseEditModal({
  isOpen,
  onClose,
  expertise,
}: ExpertiseEditModalProps) {
  const [title, setTitle] = useState(expertise?.title || "");
  const [subtitle, setSubtitle] = useState(expertise?.subtitle || "");
  const [description1, setDescription1] = useState(
    expertise?.description1 || "",
  );
  const [description2, setDescription2] = useState(
    expertise?.description2 || "",
  );
  const [description3, setDescription3] = useState(
    expertise?.description3 || "",
  );

  const { mutate: updateExpertise, isPending } = useUpdateExpertise();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertise) return;
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    updateExpertise(
      {
        id: expertise._id,
        data: { title, subtitle, description1, description2, description3 },
      },
      {
        onSuccess: () => {
          toast.success("Expertise updated successfully");
          handleClose();
        },
        onError: () => toast.error("Failed to update expertise"),
      },
    );
  };

  if (!expertise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Expertise
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-exp-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="edit-exp-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Planon Partner Certification"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-exp-subtitle"
              className="text-sm font-bold text-gray-700"
            >
              Subtitle
            </Label>
            <Input
              id="edit-exp-subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Specialized skills and proven capabilities"
            />
          </div>

          {/* Description 1 */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-exp-desc1"
              className="text-sm font-bold text-gray-700"
            >
              Description 1
            </Label>
            <Textarea
              id="edit-exp-desc1"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              className="min-h-[80px]"
              placeholder="Enter first description"
            />
          </div>

          {/* Description 2 */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-exp-desc2"
              className="text-sm font-bold text-gray-700"
            >
              Description 2
            </Label>
            <Textarea
              id="edit-exp-desc2"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              className="min-h-[80px]"
              placeholder="Enter second description"
            />
          </div>

          {/* Description 3 */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-exp-desc3"
              className="text-sm font-bold text-gray-700"
            >
              Description 3
            </Label>
            <Textarea
              id="edit-exp-desc3"
              value={description3}
              onChange={(e) => setDescription3(e.target.value)}
              className="min-h-[80px]"
              placeholder="Enter third description"
            />
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
