"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StrengthSection } from "../types/strengthSection.type";

interface StrengthHeaderViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly section: StrengthSection | null;
}

export default function StrengthHeaderViewModal({
  isOpen,
  onClose,
  section,
}: StrengthHeaderViewModalProps) {
  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Strength Header Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Title
            </span>
            <p className="text-lg font-bold text-gray-800">{section.title}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Subtitle
            </span>
            <p className="text-gray-600 leading-relaxed">{section.subtitle}</p>
          </div>
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={onClose}
              className="bg-[#0057B8] hover:bg-[#004494]"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
