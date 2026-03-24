"use client";

import { Footer } from "../types/footer.type";
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Copyright,
  Link as LinkIcon,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FooterCardProps {
  readonly item: Footer;
  readonly onView: (item: Footer) => void;
  readonly onEdit: (item: Footer) => void;
  readonly onDelete: (id: string) => void;
}

export function FooterCard({
  item,
  onView,
  onEdit,
  onDelete,
}: FooterCardProps) {
  const totalLinks =
    (item.quickLinks?.length ?? 0) +
    (item.consultingLinks?.length ?? 0) +
    (item.contactLinks?.length ?? 0);

  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <CardContent className="p-0">
        <div className="p-8 space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="flex gap-6 items-center">
              <div className="relative w-16 h-16 bg-gray-50 rounded-xl p-3 flex items-center justify-center border border-gray-100 group-hover:border-[#0057B8] transition-colors">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt="Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <Globe className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {item.copyright || "Footer Settings"}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1 italic max-w-sm">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-sm bg-blue-600 text-white hover:bg-blue-600 border-none cursor-pointer h-9 w-9"
                onClick={() => onView(item)}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-sm bg-green-600 text-white hover:bg-green-600 border-none cursor-pointer h-9 w-9"
                onClick={() => onEdit(item)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-sm bg-red-600 text-white hover:bg-red-600 border-none cursor-pointer h-9 w-9"
                onClick={() => onDelete(item._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-gray-100">
            {/* Contact Info */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Contact Info
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Mail className="w-4 h-4 text-[#0057B8]" />
                  <span className="text-sm font-medium truncate">
                    {item.email || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    {item.phone || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Links Stats */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Navigation Stats
              </p>
              <div className="flex items-center gap-2.5 text-gray-600">
                <div className="bg-blue-50 p-2 rounded-lg text-[#0057B8]">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {totalLinks}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium">
                    Total active links
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Legal
              </p>
              <div className="flex items-start gap-2.5 text-gray-600">
                <Copyright className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium leading-normal italic">
                  {item.copyright || "Not provides"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
