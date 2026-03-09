"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StrengthItem } from "../types/strengthSection.type";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface StrengthItemViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly item: StrengthItem | null;
}

export default function StrengthItemViewModal({
  isOpen,
  onClose,
  item,
}: StrengthItemViewModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Strength Item Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            <div className="relative w-40 h-28 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="w-10 h-10 text-gray-300" />
              )}
            </div>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Title
            </span>
            <p className="text-xl font-bold text-gray-800">{item.title}</p>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Subtitle
            </span>
            <p className="text-gray-600 leading-relaxed">{item.subtitle}</p>
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
