"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Footer } from "../types/footer.type";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Copyright,
  Image,
  FileText,
  Link2,
  Twitter,
  Facebook,
  Linkedin,
  Trash2,
} from "lucide-react";

interface FooterViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly footer: Footer | null;
  readonly onDeleteLink: (
    group: "quickLinks" | "consultingLinks" | "contactLinks",
    index: number,
  ) => void;
}

export default function FooterViewModal({
  isOpen,
  onClose,
  footer,
  onDeleteLink,
}: FooterViewModalProps) {
  const [deleteLinkInfo, setDeleteLinkInfo] = useState<{
    group: "quickLinks" | "consultingLinks" | "contactLinks";
    index: number;
    label: string;
  } | null>(null);

  if (!footer) return null;

  const handleDeleteClick = (
    group: "quickLinks" | "consultingLinks" | "contactLinks",
    index: number,
    label: string,
  ) => {
    setDeleteLinkInfo({ group, index, label });
  };

  const confirmDelete = () => {
    if (deleteLinkInfo) {
      onDeleteLink(deleteLinkInfo.group, deleteLinkInfo.index);
      setDeleteLinkInfo(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            View Footer Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* Logo */}
          {footer.logo && (
            <div className="flex gap-3">
              <Image className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Logo
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={footer.logo}
                  alt="Footer Logo"
                  className="h-12 object-contain rounded border p-1 bg-gray-50"
                />
              </div>
            </div>
          )}

          {/* Description */}
          {footer.description && (
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Description
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {footer.description}
                </p>
              </div>
            </div>
          )}

          <hr />

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${footer.email}`}
                  className="text-[#0057B8] hover:underline text-sm"
                >
                  {footer.email || "N/A"}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${footer.phone}`}
                  className="text-[#0057B8] hover:underline text-sm"
                >
                  {footer.phone || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex gap-3">
            <Copyright className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                Copyright
              </p>
              <p className="text-gray-700 text-sm">
                {footer.copyright || "N/A"}
              </p>
            </div>
          </div>

          <hr />

          {/* Link Groups */}
          {(
            [
              { key: "quickLinks", label: "Quick Links" },
              { key: "consultingLinks", label: "Consulting Links" },
              { key: "contactLinks", label: "Contact Links" },
            ] as const
          ).map(({ key, label }) =>
            footer[key]?.length > 0 ? (
              <div key={key} className="flex gap-3">
                <Link2 className="w-5 h-5 text-[#0057B8] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                    {label}
                  </p>
                  <ul className="space-y-1">
                    {footer[key].map((link, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 text-sm group/link"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700 min-w-[100px]">
                            {link.label}
                          </span>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0057B8] hover:underline break-all"
                          >
                            {link.url}
                          </a>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover/link:opacity-100 transition-opacity cursor-pointer"
                          onClick={() => handleDeleteClick(key, i, link.label)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null,
          )}

          <hr />

          {/* Social Links */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Social Links
            </p>
            <div className="flex flex-wrap gap-3">
              {footer.socialLinks?.twitter && (
                <a
                  href={footer.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium hover:bg-sky-200 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  Twitter
                </a>
              )}
              {footer.socialLinks?.facebook && (
                <a
                  href={footer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  Facebook
                </a>
              )}
              {footer.socialLinks?.linkedin && (
                <a
                  href={footer.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
              {!footer.socialLinks?.twitter &&
                !footer.socialLinks?.facebook &&
                !footer.socialLinks?.linkedin && (
                  <p className="text-sm text-gray-400">
                    No social links added.
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deleteLinkInfo}
          onOpenChange={(open) => !open && setDeleteLinkInfo(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Link Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove the link &quot;
                {deleteLinkInfo?.label}&quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setDeleteLinkInfo(null)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
