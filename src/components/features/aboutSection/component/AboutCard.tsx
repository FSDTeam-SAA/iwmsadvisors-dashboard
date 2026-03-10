"use client";

import { AboutSection as AboutSectionType } from "../types/aboutSection.type";
import Image from "next/image";
import { Eye, Edit, Trash2, FileImage } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AboutCardProps {
  readonly item: AboutSectionType;
  readonly onView: (item: AboutSectionType) => void;
  readonly onEdit: (item: AboutSectionType) => void;
  readonly onDelete: (id: string) => void;
}

export function AboutCard({ item, onView, onEdit, onDelete }: AboutCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
              <FileImage className="w-8 h-8" />
              <span className="text-xs">No Image Available</span>
            </div>
          )}

          {/* Actions Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-white/90 hover:bg-white text-blue-600 border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onView(item)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-white/90 hover:bg-white text-green-600 border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onEdit(item)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-white/90 hover:bg-white text-red-600 border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onDelete(item._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8] bg-blue-50 px-2 py-0.5 rounded-full">
                {item.subtitle || "About Us"}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-[#0057B8] transition-colors">
              {item.title}
            </h3>
            <p className="text-sm font-semibold text-gray-700 line-clamp-1">
              {item.descriptionTitle}
            </p>
            <p className="text-sm text-gray-500 line-clamp-3 min-h-[60px]">
              {item.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
