"use client";

import { useState, useEffect } from "react";
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

interface ContactInformationEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly contactInformation: ContactInformation | null;
  readonly onSave: (updatedData: Partial<ContactInformation>) => void;
}

export default function ContactInformationEditModal({
  isOpen,
  onClose,
  contactInformation,
  onSave,
}: ContactInformationEditModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    mapUrl: "",
  });

  useEffect(() => {
    if (contactInformation) {
      setFormData({
        title: contactInformation.title || "",
        description: contactInformation.description || "",
        email: contactInformation.email || "",
        phone: contactInformation.phone || "",
        address: contactInformation.address || "",
        mapUrl: contactInformation.mapUrl || "",
      });
    }
  }, [contactInformation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!contactInformation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Contact Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-title"
              className="text-sm font-bold text-gray-700"
            >
              Title *
            </Label>
            <Input
              id="edit-title"
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
              htmlFor="edit-description"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="edit-description"
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
                htmlFor="edit-email"
                className="text-sm font-bold text-gray-700"
              >
                Email
              </Label>
              <Input
                id="edit-email"
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
                htmlFor="edit-phone"
                className="text-sm font-bold text-gray-700"
              >
                Phone
              </Label>
              <Input
                id="edit-phone"
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
              htmlFor="edit-address"
              className="text-sm font-bold text-gray-700"
            >
              Address
            </Label>
            <Input
              id="edit-address"
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
              htmlFor="edit-mapUrl"
              className="text-sm font-bold text-gray-700"
            >
              Google Maps URL
            </Label>
            <Input
              id="edit-mapUrl"
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
