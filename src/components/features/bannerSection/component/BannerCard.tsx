"use client";

import { BannerSection as BannerSectionType } from "../types/bannerSection.type";
import Image from "next/image";
import { Eye, Edit, Trash2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BannerCardProps {
  readonly banner: BannerSectionType;
  readonly onView: (banner: BannerSectionType) => void;
  readonly onEdit: (banner: BannerSectionType) => void;
  readonly onDelete: (id: string) => void;
}

export function BannerCard({
  banner,
  onView,
  onEdit,
  onDelete,
}: BannerCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          {banner.image ? (
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
          {/* Actions Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg text-[#ffff] bg-blue-600 hover:bg-blue-500 border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onView(banner)}
            >
              <Eye className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-green-600 hover:bg-green-500 text-white border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onEdit(banner)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg bg-red-600 hover:bg-red-500 text-white border-none backdrop-blur-sm cursor-pointer"
              onClick={() => onDelete(banner._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-[#0057B8] transition-colors">
              {banner.title}
            </h3>
            <p className="text-base text-gray-500 line-clamp-2 min-h-12">
              {banner.subTitle || "No subtitle provided"}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {new Date(banner.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
