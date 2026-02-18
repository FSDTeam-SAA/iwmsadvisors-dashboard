"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServicePage } from "../types/service-management.types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ServiceManagementViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly servicePage: ServicePage | null;
}

export default function ServiceManagementViewModal({
  isOpen,
  onClose,
  servicePage,
}: ServiceManagementViewModalProps) {
  if (!servicePage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Service Page Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Image */}
          {servicePage.image?.url && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
              <Image
                src={servicePage.image.url}
                alt={servicePage.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Main Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {servicePage.title}
              </h2>
              <h1 className="text-gray-500 font-medium">{servicePage.heading}</h1>
            </div>

            {servicePage.subtitles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {servicePage.subtitles.map((sub, idx) => (
                  <Badge key={idx}   className="px-3 py-1">
                    {sub}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Guideline */}
          <div className="grid grid-cols-1 gap-2">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Guideline
            </h4>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              {servicePage.guideline}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Description
            </h4>
            <div className="bg-[#F8FAFC] rounded-2xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-wrap">
                {servicePage.description}
              </p>
            </div>
          </div>

          {/* FAQs */}
          {servicePage.faq.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                FAQ
              </h4>
              <div className="grid gap-3">
                {servicePage.faq.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <p className="font-semibold text-gray-800 mb-1">
                      Q: {item.question}
                    </p>
                    <p className="text-gray-600">A: {item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
