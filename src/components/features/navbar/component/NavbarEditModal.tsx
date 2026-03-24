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
import { Upload } from "lucide-react";
import Image from "next/image";
import { useUpdateNavbar } from "../hooks/useNavbar";
import { Navbar } from "../types/navbar.type";

interface NavbarEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly navbar: Navbar | null;
}

export default function NavbarEditModal({
  isOpen,
  onClose,
  navbar,
}: NavbarEditModalProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    navbar?.logo || null,
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const { mutate: updateNavbar, isPending } = useUpdateNavbar();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const render = new FileReader();
      render.onloadend = () => {
        setLogoPreview(render.result as string);
      };
      render.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    // If we have a file, clear it. If we have a preview from the existing logo, clear it.
    // Wait, the user's implementation for persistent "Change x" button suggests replacing it directly.
    document.getElementById("navbar-logo-edit")?.click();
  };

  const handleClose = () => {
    setLogoFile(null);
    setLogoPreview(null);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navbar) return;

    const data: { logo?: File } = {};
    if (logoFile) {
      data.logo = logoFile;
    } else {
      // If no new file is selected, we could either prevent update or just close.
      // Usually, if there's no change, just close.
      handleClose();
      return;
    }

    updateNavbar(
      { id: navbar._id, data },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Logo
          </DialogTitle>
        </DialogHeader>

        {navbar && (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Logo Image
              </h3>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative group">
                {logoPreview ? (
                  <div className="flex flex-col items-center w-full gap-4">
                    <div className="relative w-full h-40">
                      <Image
                        src={logoPreview}
                        alt="Logo Preview"
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="navbar-logo-edit-new"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#0057B8] hover:text-[#004494] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0057B8]"
                      >
                        <span>Upload a file</span>
                        <Input
                          id="navbar-logo-edit-new"
                          name="navbar-logo-edit-new"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={removeImage}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-[#0057B8] hover:bg-gray-50 hover:border-[#0057B8]/30 transition-all cursor-pointer group"
              >
                <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Change Image
              </button>
              <p className="text-xs text-gray-500">
                Click to select a different logo
              </p>
              <Input
                id="navbar-logo-edit"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#0057B8] hover:bg-[#004494]"
                disabled={isPending || !logoFile}
              >
                {isPending ? "Updating..." : "Update Logo"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
