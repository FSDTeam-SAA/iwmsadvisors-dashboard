"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactInformation } from "../types/contactInformation.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactInformationAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (
    data: Omit<ContactInformation, "_id" | "createdAt" | "updatedAt">,
  ) => void;
}

export default function ContactInformationAddModal({
  isOpen,
  onClose,
  onSave,
}: ContactInformationAddModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    mapUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      description: "",
      email: "",
      phone: "",
      address: "",
      mapUrl: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Add Contact Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="add-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="add-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="e.g. Contact Information"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="add-description"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="add-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[100px]"
              placeholder="Enter description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="add-email"
                className="text-sm font-bold text-gray-700"
              >
                Email
              </Label>
              <Input
                id="add-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
                placeholder="info@example.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="add-phone"
                className="text-sm font-bold text-gray-700"
              >
                Phone
              </Label>
              <Input
                id="add-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label
              htmlFor="add-address"
              className="text-sm font-bold text-gray-700"
            >
              Address
            </Label>
            <Input
              id="add-address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter full address"
            />
          </div>

          {/* Map URL */}
          <div className="space-y-2">
            <Label
              htmlFor="add-mapUrl"
              className="text-sm font-bold text-gray-700"
            >
              Google Maps URL
            </Label>
            <Input
              id="add-mapUrl"
              name="mapUrl"
              value={formData.mapUrl}
              onChange={handleChange}
              className="w-full"
              placeholder="https://www.google.com/maps/..."
            />
          </div>

          {/* Action Buttons */}
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
              className="px-6 bg-[#0057B8] hover:bg-[#004494] cursor-pointer"
            >
              Add Information
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
