// src/components/features/SubscriberTitleSubtitle/component/SubscriberModal.tsx

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubscriberTitle, CreateSubscriberTitleDTO } from "../types/subscriber.types";

interface SubscriberModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: CreateSubscriberTitleDTO) => void;
  readonly initialData?: SubscriberTitle | null;
}

export default function SubscriberModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: SubscriberModalProps) {
  const [formData, setFormData] = useState<CreateSubscriberTitleDTO>({
    title: initialData?.title || "",
    subTitle: initialData?.subTitle || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            {initialData ? "Edit Subscriber Title" : "Add Subscriber Title"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-bold text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subTitle" className="text-sm font-bold text-gray-700">
              Subtitle *
            </Label>
            <Input
              id="subTitle"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter subtitle"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#0057B8] hover:bg-[#004494] text-white"
            >
              {initialData ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
