"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Vision } from "../types/missionVision.type";
import { FileText, ImageIcon } from "lucide-react";
import Image from "next/image";

interface VisionViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly vision: Vision | null;
}

export default function VisionViewModal({
  isOpen,
  onClose,
  vision,
}: VisionViewModalProps) {
  if (!vision) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            View Vision
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* Image */}
          {vision.image && (
            <div className="flex gap-3">
              <ImageIcon className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div className="w-full">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Image
                </p>
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <Image
                    src={vision.image}
                    alt={vision.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
              Title
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {vision.title || "N/A"}
            </p>
          </div>

          {/* Description */}
          {vision.description && (
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Description
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {vision.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
