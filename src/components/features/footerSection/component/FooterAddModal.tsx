"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Footer, FooterLink, FooterCreateRequest } from "../types/footer.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface FooterAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: FooterCreateRequest) => void;
}

const emptyLink = (): FooterLink => ({ label: "", url: "" });

const defaultForm = () => ({
  description: "",
  email: "",
  phone: "",
  copyright: "",
  quickLinks: [emptyLink()],
  consultingLinks: [emptyLink()],
  contactLinks: [emptyLink()],
  socialLinks: { twitter: "", facebook: "", linkedin: "" },
});

function LinkListEditor({
  id,
  label,
  links,
  onChange,
}: {
  id: string;
  label: string;
  links: FooterLink[];
  onChange: (links: FooterLink[]) => void;
}) {
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
          <div key={i} className="flex gap-2 items-center">
            <Input
              id={`${id}-label-${i}`}
              placeholder="Label"
              value={link.label}
              onChange={(e) => update(i, "label", e.target.value)}
              className="flex-1"
            />
            <Input
              id={`${id}-url-${i}`}
              placeholder="URL"
              value={link.url}
              onChange={(e) => update(i, "url", e.target.value)}
              className="flex-1"
            />
            {links.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1.5 text-red-500 hover:text-red-700 shrink-0"
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

export default function FooterAddModal({
  isOpen,
  onClose,
  onSave,
}: FooterAddModalProps) {
  const [formData, setFormData] = useState(defaultForm());
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
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
    onSave({ ...formData, logoFile });

    setFormData(defaultForm());
    setLogoFile(null);
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
    }
    onClose();
  };

  const handleClose = () => {
    setFormData(defaultForm());
    setLogoFile(null);
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Add Footer Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">
              Logo Image
            </Label>
            <input
              ref={fileInputRef}
              id="add-logo"
              name="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setLogoFile(file);
                if (logoPreview) URL.revokeObjectURL(logoPreview);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setLogoPreview(url);
                } else {
                  setLogoPreview(null);
                }
              }}
            />

            <div
              className="border-2 border-dashed rounded-xl p-4 bg-[#F8FAFC] hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {logoPreview ? (
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center p-2">
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-24 text-gray-500">
                  <p className="text-sm font-medium">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs">PNG, JPG, SVG up to ~2MB</p>
                  <Button
                    type="button"
                    className="mt-3 bg-[#0057B8] hover:bg-[#004494] h-8 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose Image
                  </Button>
                </div>
              )}
            </div>

            {logoFile && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500 truncate">
                  {logoFile.name}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setLogoFile(null);
                    if (logoPreview) {
                      URL.revokeObjectURL(logoPreview);
                      setLogoPreview(null);
                    }
                  }}
                  className="h-8"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

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
              className="w-full min-h-[80px]"
              placeholder="Enter footer description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="+1 445 45 55"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="add-copyright"
              className="text-sm font-bold text-gray-700"
            >
              Copyright
            </Label>
            <Input
              id="add-copyright"
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
                htmlFor="add-twitter"
                className="text-sm font-bold text-gray-700"
              >
                Twitter
              </Label>
              <Input
                id="add-twitter"
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleSocialChange}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="add-facebook"
                className="text-sm font-bold text-gray-700"
              >
                Facebook
              </Label>
              <Input
                id="add-facebook"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleSocialChange}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="add-linkedin"
                className="text-sm font-bold text-gray-700"
              >
                LinkedIn
              </Label>
              <Input
                id="add-linkedin"
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
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#0057B8] hover:bg-[#004494] cursor-pointer"
            >
              Add Footer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
