// src/components/features/consultant/component/ConsultantCard.tsx
"use client";

import { Consultant as ConsultantType } from "../types/consultant.type";
import { UserCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConsultantCardProps {
  readonly consultant: ConsultantType;
  readonly onEdit: (consultant: ConsultantType) => void;
  readonly onDelete: (id: string) => void;
}

export function ConsultantCard({ consultant, onEdit, onDelete }: ConsultantCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className=" p-3 rounded-xl transition-colors ">
            {/* <UserCircle className="w-8 h-8 text-[#0057B8]" /> */}
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-sm bg-green-600 hover:bg-green-500 text-white border-none cursor-pointer"
              onClick={() => onEdit(consultant)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-sm bg-red-600 hover:bg-red-500 text-white border-none cursor-pointer"
              onClick={() => onDelete(consultant._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-[#0057B8] transition-colors">
            {consultant.title}
          </h3>
          <p className="text-base text-gray-500 line-clamp-3 min-h-18">
            {consultant.description}
          </p>
        </div>

        <div className="pt-2">
          <Button className="w-full bg-[#0057B8] hover:bg-[#004494] text-white font-semibold rounded-lg">
            {consultant.btnName}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
