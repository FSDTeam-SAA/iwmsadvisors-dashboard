"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BannerSection } from "../types/bannerSection.type";
import Image from "next/image";

interface BannerSectionViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly bannerSection: BannerSection | null;
}

export default function BannerSectionViewModal({
  isOpen,
  onClose,
  bannerSection,
}: BannerSectionViewModalProps) {
  if (!bannerSection) return null;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(bannerSection.createdAt));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Banner Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Banner Image */}
          {bannerSection.image && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={bannerSection.image}
                alt={bannerSection.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {bannerSection.title}
            </h2>
            {bannerSection.subTitle && (
              <p className="text-lg text-gray-600">{bannerSection.subTitle}</p>
            )}
            <p className="text-sm text-gray-500 pt-1">
              Created on {formattedDate}
            </p>
          </div>

          {/* Buttons */}
          {(bannerSection.btn1 || bannerSection.btn2) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bannerSection.btn1 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Button 1
                  </p>
                  <div className="bg-[#F8FAFC] rounded-xl p-4 border">
                    <p className="text-sm text-gray-700 font-semibold">
                      {bannerSection.btn1}
                    </p>
                  </div>
                </div>
              )}
              {bannerSection.btn2 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Button 2
                  </p>
                  <div className="bg-[#F8FAFC] rounded-xl p-4 border">
                    <p className="text-sm text-gray-700 font-semibold">
                      {bannerSection.btn2}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
