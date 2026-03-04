"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AboutSection } from "../types/aboutSection.type";
import Image from "next/image";

interface AboutSectionViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly aboutSection: AboutSection | null;
}

export default function AboutSectionViewModal({
  isOpen,
  onClose,
  aboutSection,
}: AboutSectionViewModalProps) {
  if (!aboutSection) return null;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(aboutSection.createdAt));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            About Section Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* About Image */}
          {aboutSection.image && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={aboutSection.image}
                alt={aboutSection.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {aboutSection.title}
            </h2>
            {aboutSection.subtitle && (
              <p className="text-lg text-gray-600 font-medium">
                {aboutSection.subtitle}
              </p>
            )}
            <p className="text-sm text-gray-500 pt-1">
              Created on {formattedDate}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Description Title
                </p>
                <p className="text-gray-700 font-semibold italic">
                  {aboutSection.descriptionTitle || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Button Name
                </p>
                <div className="inline-block bg-[#F8FAFC] rounded-lg px-3 py-1 border border-gray-100">
                  <p className="text-sm text-gray-600 font-medium">
                    {aboutSection.btnName || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Description
              </p>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-gray-100 min-h-[100px]">
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {aboutSection.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
