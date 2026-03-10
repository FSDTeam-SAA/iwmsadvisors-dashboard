"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { StatsSection } from "../types/statsSection.type";

interface StatsSectionViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly statsSection: StatsSection | null;
}

export default function StatsSectionViewModal({
  isOpen,
  onClose,
  statsSection,
}: StatsSectionViewModalProps) {
  if (!statsSection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Stats Section Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Header Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Title
              </Label>
              <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-[#0057B8] pl-4">
                {statsSection.title}
              </h3>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Subtitle
              </Label>
              <p className="text-gray-700 leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-gray-100">
                {statsSection.subtitle || "N/A"}
              </p>
            </div>
          </div>

          {/* Stats Items */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Stats Items
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statsSection.items && statsSection.items.length > 0 ? (
                statsSection.items.map((item) => (
                  <div
                    key={item.title + item.order}
                    className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-2xl font-bold text-[#0057B8]">
                        {item.value}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full uppercase">
                        Order {item.order}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 bg-gray-50 rounded-xl border border-dashed text-gray-400 italic">
                  No stats items found.
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t text-xs text-gray-400">
            <div>
              <span className="font-semibold text-gray-500">Created:</span>{" "}
              {new Date(statsSection.createdAt).toLocaleString()}
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-500">Last Updated:</span>{" "}
              {new Date(statsSection.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
