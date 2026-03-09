"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IwmsSolutionsSection } from "../types/iwmsSolutionsSection.type";
import Image from "next/image";

interface IwmsSolutionsSectionViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  iwmsSolutionsSection: IwmsSolutionsSection | null;
}

export default function IwmsSolutionsSectionViewModal({
  isOpen,
  onClose,
  iwmsSolutionsSection,
}: IwmsSolutionsSectionViewModalProps) {
  if (!iwmsSolutionsSection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            View Features Section Detail
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Section Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Section Order
              </p>
              <p className="text-lg font-bold text-[#0057B8]">
                {iwmsSolutionsSection.order}
              </p>
            </div>
            <div className="md:col-span-2 space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Section Title
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {iwmsSolutionsSection.title}
              </p>
            </div>
            {iwmsSolutionsSection.subtitle && (
              <div className="md:col-span-3 space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Subtitle
                </p>
                <p className="text-gray-600">{iwmsSolutionsSection.subtitle}</p>
              </div>
            )}
          </div>

          {/* Items Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#0057B8] rounded-full"></span>
              Items Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {iwmsSolutionsSection.items.map((item) => (
                <div
                  key={item.order}
                  className="group relative border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                      {item.icon ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          No Icon
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">
                          Item {item.order}
                        </span>
                        <h4 className="font-bold text-gray-900 truncate">
                          {item.title || "No Title"}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {item.description || "No Description"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t bg-gray-50 flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            className="px-8 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
