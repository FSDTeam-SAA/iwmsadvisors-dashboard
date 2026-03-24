"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Footer, FooterLink, FooterUpdateRequest } from "../types/footer.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";

interface FooterEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly footer: Footer | null;
  readonly onSave: (id: string, data: FooterUpdateRequest) => void;
}

const emptyLink = (): FooterLink => ({ label: "", url: "" });

function LinkListEditor({
  id,
  label,
  links,
  onChange,
}: Readonly<{
  id: string;
  label: string;
  links: FooterLink[];
  onChange: (links: FooterLink[]) => void;
}>) {
  const update = (index: number, field: keyof FooterLink, value: string) => {
    const updated = links.map((l, i) =>
      i === index ? { ...l, [field]: value } : l,
    );
    onChange(updated);
  };

  const add = () => onChange([...links, emptyLink()]);

  const remove = (index: number) =>
    onChange(links.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-bold text-gray-700">{label}</Label>
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1 text-xs text-[#0057B8] hover:text-[#004494] font-semibold"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {links.map((link, i) => (
          <div key={`${id}-link-${i}`} className="flex gap-2 items-center">
            <Input
              id={`${id}-edit-label-${i}`}
              placeholder="Label"
              value={link.label}
              onChange={(e) => update(i, "label", e.target.value)}
              className="flex-1"
            />
            <Input
              id={`${id}-edit-url-${i}`}
              placeholder="URL"
              value={link.url}
              onChange={(e) => update(i, "url", e.target.value)}
              className="flex-1"
            />
            {links.length > 0 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1.5 text-red-500 hover:text-red-700 shrink-0 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FooterEditModal({
  isOpen,
  onClose,
  footer,
  onSave,
}: Readonly<FooterEditModalProps>) {
  const [formData, setFormData] = useState({
    description: "",
    email: "",
    phone: "",
    copyright: "",
    quickLinks: [emptyLink()],
    consultingLinks: [emptyLink()],
    contactLinks: [emptyLink()],
    socialLinks: {
      twitter: "",
      facebook: "",
      linkedin: "",
    },
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Track previous footer ID to synchronize state during render
  const [prevFooterId, setPrevFooterId] = useState<string | null>(null);

  // Synchronize state during render when footer changes or modal opens
  const footerToSync = isOpen ? footer : null;
  if (footerToSync && footerToSync._id !== prevFooterId) {
    setPrevFooterId(footerToSync._id);
    setFormData({
      description: footerToSync.description ?? "",
      email: footerToSync.email ?? "",
      phone: footerToSync.phone ?? "",
      copyright: footerToSync.copyright ?? "",
      quickLinks: footerToSync.quickLinks?.length
        ? footerToSync.quickLinks
        : [emptyLink()],
      consultingLinks: footerToSync.consultingLinks?.length
        ? footerToSync.consultingLinks
        : [emptyLink()],
      contactLinks: footerToSync.contactLinks?.length
        ? footerToSync.contactLinks
        : [emptyLink()],
      socialLinks: {
        twitter: footerToSync.socialLinks?.twitter ?? "",
        facebook: footerToSync.socialLinks?.facebook ?? "",
        linkedin: footerToSync.socialLinks?.linkedin ?? "",
      },
    });
    setLogoPreview(footerToSync.logo ?? null);
    setLogoFile(null);
  } else if (!isOpen && prevFooterId !== null) {
    setPrevFooterId(null);
  }

  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footer) return;
    onSave(footer._id, { ...formData, logoFile });
  };



  if (!footer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Footer Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Logo Upload */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-700">
              Logo Image
            </Label>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative group w-full max-w-[200px] h-32 mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <label
                    htmlFor="footer-logo-upload"
                    className="flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-gray-100/50 transition-colors"
                  >
                    <Plus className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center px-4">
                      Choose Logo
                    </p>
                  </label>
                )}
              </div>
              
              {logoPreview && (
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-[#0057B8] hover:bg-gray-50 hover:border-[#0057B8]/30 transition-all cursor-pointer group"
                  >
                    <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Change Image
                  </button>
                  <p className="text-xs text-gray-500">
                    Click to select a different logo
                  </p>
                </div>
              )}
              <input
                id="footer-logo-upload"
                ref={fileInputRef}
                name="logo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setLogoFile(file);
                  if (logoPreview?.startsWith("blob:")) {
                    URL.revokeObjectURL(logoPreview);
                  }
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setLogoPreview(url);
                  }
                }}
              />
            </div>
          </div>

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
              className="w-full min-h-[80px]"
              placeholder="Enter footer description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="+1 445 45 55"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="edit-copyright"
              className="text-sm font-bold text-gray-700"
            >
              Copyright
            </Label>
            <Input
              id="edit-copyright"
              name="copyright"
              value={formData.copyright}
              onChange={handleChange}
              className="w-full"
              placeholder="Copyright © 2026 Company Name"
            />
          </div>

          <hr />

          {/* Link Sections */}
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Navigation Links
          </p>

          <LinkListEditor
            id="quick"
            label="Quick Links"
            links={formData.quickLinks}
            onChange={(links) =>
              setFormData((prev) => ({ ...prev, quickLinks: links }))
            }
          />

          <LinkListEditor
            id="consulting"
            label="Consulting Links"
            links={formData.consultingLinks}
            onChange={(links) =>
              setFormData((prev) => ({ ...prev, consultingLinks: links }))
            }
          />

          <LinkListEditor
            id="contact"
            label="Contact Links"
            links={formData.contactLinks}
            onChange={(links) =>
              setFormData((prev) => ({ ...prev, contactLinks: links }))
            }
          />

          <hr />

          {/* Social Links */}
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Social Links
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="edit-twitter"
                className="text-sm font-bold text-gray-700"
              >
                Twitter
              </Label>
              <Input
                id="edit-twitter"
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleSocialChange}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-facebook"
                className="text-sm font-bold text-gray-700"
              >
                Facebook
              </Label>
              <Input
                id="edit-facebook"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleSocialChange}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-linkedin"
                className="text-sm font-bold text-gray-700"
              >
                LinkedIn
              </Label>
              <Input
                id="edit-linkedin"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/..."
              />
            </div>
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
