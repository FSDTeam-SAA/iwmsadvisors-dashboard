"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { TransformSection } from "../types/transforming.type";

interface TransformViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly transformSection: TransformSection | null;
}

export default function TransformViewModal({
  isOpen,
  onClose,
  transformSection,
}: TransformViewModalProps) {
  if (!transformSection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Transform Section Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Title
              </Label>
              <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-[#0057B8] pl-4">
                {transformSection.title}
              </h3>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Description
              </Label>
              <p className="text-gray-700 leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-gray-100">
                {transformSection.description}
              </p>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Attachments
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => {
                const imageUrl = transformSection[
                  `image${num}` as keyof TransformSection
                ] as string;
                return (
                  <div key={num} className="space-y-2">
                    <p className="text-xs font-medium text-gray-400 text-center">
                      Image {num}
                    </p>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={`Transform image ${num}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-sm">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t text-xs text-gray-400">
            <div>
              <span className="font-semibold text-gray-500">Created:</span>{" "}
              {new Date(transformSection.createdAt).toLocaleString()}
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-500">Last Updated:</span>{" "}
              {new Date(transformSection.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
