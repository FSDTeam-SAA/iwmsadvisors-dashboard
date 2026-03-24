"use client";

import { ContactInformation } from "../types/contactInformation.type";
import { Eye, Edit, Trash2, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactInformationCardProps {
  readonly item: ContactInformation;
  readonly onView: (item: ContactInformation) => void;
  readonly onEdit: (item: ContactInformation) => void;
  readonly onDelete: (id: string) => void;
}

export function ContactInformationCard({
  item,
  onView,
  onEdit,
  onDelete,
}: ContactInformationCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <CardContent className="p-0">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0057B8] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-sm bg-blue-600 hover:bg-blue-600 text-white border-none cursor-pointer h-9 w-9"
                onClick={() => onView(item)}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-sm bg-green-600 hover:bg-green-600 text-white border-none cursor-pointer h-9 w-9"
                onClick={() => onEdit(item)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-sm bg-red-600 hover:bg-red-600 text-white border-none cursor-pointer h-9 w-9"
                onClick={() => onDelete(item._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-[#0057B8]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {item.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {item.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Office Address
                </p>
                <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                  {item.address || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Maps Location
                </p>
                {item.mapUrl ? (
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#0057B8] hover:underline"
                  >
                    View on Google Maps
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-gray-400">
                    No URL provided
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
