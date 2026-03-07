// src/components/features/Certifications/component/CertificationEditModal.tsx

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
import { useUpdateCertification } from "../hooks/useCertifications";
import { Certification } from "../types/certifications.type";
import { toast } from "sonner";

interface CertificationEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly certification: Certification | null;
}

export default function CertificationEditModal({
  isOpen,
  onClose,
  certification,
}: CertificationEditModalProps) {
  const [title, setTitle] = useState(certification?.title || "");
  const [subtitle, setSubtitle] = useState(certification?.subtitle || "");
  const [description1, setDescription1] = useState(
    certification?.description1 || "",
  );
  const [description2, setDescription2] = useState(
    certification?.description2 || "",
  );
  const [description3, setDescription3] = useState(
    certification?.description3 || "",
  );

  const { mutate: updateCertification, isPending } = useUpdateCertification();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certification) return;
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    updateCertification(
      {
        id: certification._id,
        data: { title, subtitle, description1, description2, description3 },
      },
      {
        onSuccess: () => {
          toast.success("Certification updated successfully");
          handleClose();
        },
        onError: () => toast.error("Failed to update certification"),
      },
    );
  };

  if (!certification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Certification
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-cert-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="edit-cert-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. ISO 27001 Certified"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-cert-subtitle"
              className="text-sm font-bold text-gray-700"
            >
              Subtitle
            </Label>
            <Input
              id="edit-cert-subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Industry-recognized qualifications"
            />
          </div>

          {/* Description 1 */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-cert-desc1"
              className="text-sm font-bold text-gray-700"
            >
              Description 1
            </Label>
            <Textarea
              id="edit-cert-desc1"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              className="min-h-[80px]"
              placeholder="Enter first description"
            />
          </div>

          {/* Description 2 */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-cert-desc2"
              className="text-sm font-bold text-gray-700"
            >
              Description 2
            </Label>
            <Textarea
              id="edit-cert-desc2"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              className="min-h-[80px]"
              placeholder="Enter second description"
            />
          </div>

          {/* Description 3 */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-cert-desc3"
              className="text-sm font-bold text-gray-700"
            >
              Description 3
            </Label>
            <Textarea
              id="edit-cert-desc3"
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
