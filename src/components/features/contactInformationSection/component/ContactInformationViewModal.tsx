"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactInformation } from "../types/contactInformation.type";
import { Mail, Phone, MapPin, Link, FileText } from "lucide-react";

interface ContactInformationViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly contactInformation: ContactInformation | null;
}

export default function ContactInformationViewModal({
  isOpen,
  onClose,
  contactInformation,
}: ContactInformationViewModalProps) {
  if (!contactInformation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            View Contact Information
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
              Title
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {contactInformation.title || "N/A"}
            </p>
          </div>

          {/* Description */}
          {contactInformation.description && (
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Description
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {contactInformation.description}
                </p>
              </div>
            </div>
          )}

          <hr />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${contactInformation.email}`}
                  className="text-[#0057B8] hover:underline text-sm"
                >
                  {contactInformation.email || "N/A"}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${contactInformation.phone}`}
                  className="text-[#0057B8] hover:underline text-sm"
                >
                  {contactInformation.phone || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                Address
              </p>
              <p className="text-gray-700 text-sm">
                {contactInformation.address || "N/A"}
              </p>
            </div>
          </div>

          {/* Map URL */}
          {contactInformation.mapUrl && (
            <div className="flex gap-3">
              <Link className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Google Maps URL
                </p>
                <a
                  href={contactInformation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0057B8] hover:underline text-sm break-all"
                >
                  {contactInformation.mapUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
