"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HeroSection } from "../types/heroSection.type";
import Image from "next/image";

interface HeroSectionViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroSection: HeroSection | null;
}

export default function HeroSectionViewModal({
  isOpen,
  onClose,
  heroSection,
}: HeroSectionViewModalProps) {
  if (!heroSection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            View Hero Section Detail
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Order
              </label>
              <p className="text-sm font-medium text-gray-900">
                {heroSection.order}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Title
              </label>
              <p className="text-sm font-medium text-gray-900">
                {heroSection.title}
              </p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Subtitle
              </label>
              <p className="text-sm font-medium text-gray-900">
                {heroSection.subtitle || "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Hero Image
            </label>
            {heroSection.image ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border bg-gray-50">
                <Image
                  src={heroSection.image}
                  alt={heroSection.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 text-gray-400">
                <p className="text-sm">No image provided</p>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-3">System Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  ID
                </label>
                <p className="text-xs font-mono text-gray-600 bg-gray-100 p-1 rounded">
                  {heroSection._id}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Created At
                </label>
                <p className="text-sm text-gray-600">
                  {heroSection.createdAt
                    ? new Date(heroSection.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Updated At
                </label>
                <p className="text-sm text-gray-600">
                  {heroSection.updatedAt
                    ? new Date(heroSection.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
