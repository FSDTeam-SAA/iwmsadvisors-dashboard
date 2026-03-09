"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TransformingNumber } from "../types/transformingNumber.type";

interface TransformingNumberViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: TransformingNumber | null;
}

export default function TransformingNumberViewModal({
  isOpen,
  onClose,
  section,
}: TransformingNumberViewModalProps) {
  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Number Section Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.items.map((item, index) => (
              <div
                key={index}
                className="space-y-2 bg-[#F8FAFC] p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                <Label className="text-xs font-bold text-[#0057B8] uppercase tracking-wider">
                  Item {item.order}
                </Label>
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-black text-[#1E293B]">
                    {item.value}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t text-xs text-gray-400">
            <div>
              <span className="font-semibold text-gray-500">Created:</span>{" "}
              {new Date(section.createdAt).toLocaleString()}
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-500">Last Updated:</span>{" "}
              {new Date(section.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
