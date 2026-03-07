// src/components/features/Expertise/component/ExpertiseViewModal.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Expertise } from "../types/expertise.type";

interface ExpertiseViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly expertise: Expertise | null;
}

export default function ExpertiseViewModal({
  isOpen,
  onClose,
  expertise,
}: ExpertiseViewModalProps) {
  if (!expertise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Expertise Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Title
            </Label>
            <p className="text-lg font-semibold text-gray-800">
              {expertise.title}
            </p>
          </div>

          {/* Subtitle */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Subtitle
            </Label>
            <p className="text-gray-700">{expertise.subtitle || "—"}</p>
          </div>

          {/* Description 1 */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Description 1
            </Label>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {expertise.description1 || "—"}
            </p>
          </div>

          {/* Description 2 */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Description 2
            </Label>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {expertise.description2 || "—"}
            </p>
          </div>

          {/* Description 3 */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Description 3
            </Label>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {expertise.description3 || "—"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              type="button"
              onClick={onClose}
              className="px-8 bg-gray-800 hover:bg-gray-900 text-white cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
