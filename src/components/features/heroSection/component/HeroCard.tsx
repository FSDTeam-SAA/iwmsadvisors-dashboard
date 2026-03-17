"use client";

import { HeroSection as HeroSectionType } from "../types/heroSection.type";
import Image from "next/image";
import { Eye, Edit, Trash2, Hash, FileImage } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HeroCardProps {
  readonly section: HeroSectionType;
  readonly onView: (section: HeroSectionType) => void;
  readonly onEdit: (section: HeroSectionType) => void;
  readonly onDelete: (section: HeroSectionType) => void;
}

export function HeroCard({ section, onView, onEdit, onDelete }: HeroCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          {section.image ? (
            <Image
              src={section.image}
              alt={section.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
              <FileImage className="w-8 h-8" />
              <span className="text-xs">No Image Available</span>
            </div>
          )}

          {/* Order Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
            <Hash className="w-3.5 h-3.5 text-[#0057B8]" />
            <span className="text-xs font-bold text-gray-900">
              Order: {section.order}
            </span>
          </div>

          {/* Actions Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-500 text-white border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onView(section)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-green-600 hover:bg-green-500 text-white border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onEdit(section)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-red-600 hover:bg-red-500 text-white border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onDelete(section)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-[#0057B8] transition-colors">
              {section.title}
            </h3>
            <p className="text-base text-gray-500 line-clamp-2 min-h-12">
              {section.subtitle || "No subtitle provided"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
