"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogSection } from "../types/blogsection.types";
import Image from "next/image";

interface BlogSectionViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly blogSection: BlogSection | null;
}

export default function BlogSectionViewModal({
  isOpen,
  onClose,
  blogSection,
}: BlogSectionViewModalProps) {
  if (!blogSection) return null;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(blogSection.createdAt));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Blog Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Blog Image */}
          {blogSection.image?.url && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={blogSection.image.url}
                alt={blogSection.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {blogSection.title}
            </h2>
            {blogSection.subtitle && (
              <p className="text-lg text-gray-600">{blogSection.subtitle}</p>
            )}
            <p className="text-sm text-gray-500 pt-1">
              Created on {formattedDate}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Content
            </p>
            <div className="bg-[#F8FAFC] rounded-2xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-wrap">
                {blogSection.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
