// src/components/features/ServiceTitleSubtitle/component/ServiceCard.tsx

"use client";

import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceTitle } from "../types/service.types";

interface ServiceCardProps {
  readonly serviceTitle: ServiceTitle;
  readonly onEdit: (serviceTitle: ServiceTitle) => void;
  readonly onDelete: (id: string) => void;
}

export function ServiceCard({ serviceTitle, onEdit, onDelete }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-2xl">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {serviceTitle.title}
            </h3>
            <p className="text-gray-500 line-clamp-2">{serviceTitle.subTitle}</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(serviceTitle)}
              className="text-[#0057B8] border-[#0057B8] hover:bg-[#0057B8] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(serviceTitle._id)}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
