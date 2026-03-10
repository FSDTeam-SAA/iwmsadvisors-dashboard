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
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCreateNavbar } from "../hooks/useNavbar";

interface NavbarAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function NavbarAddModal({
  isOpen,
  onClose,
}: NavbarAddModalProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const { mutate: createNavbar, isPending } = useCreateNavbar();

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
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleClose = () => {
    removeImage();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile) return;

    createNavbar(
      { logo: logoFile },
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
            Add Navbar Logo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">
              Logo Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative group">
              {logoPreview ? (
                <div className="relative w-full h-40">
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    fill
                    className="object-contain rounded-md"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("navbar-logo-upload")?.click();
                      }}
                      className="bg-white/90 text-gray-700 p-1.5 rounded-full shadow-sm hover:bg-white hover:text-blue-600 transition-colors border border-gray-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" /> Change
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-white/90 text-gray-700 p-1.5 rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors border border-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="navbar-logo-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#0057B8] hover:text-[#004494] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0057B8]"
                    >
                      <span>Upload a file</span>
                      <Input
                        id="navbar-logo-upload"
                        name="navbar-logo-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
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
              {isPending ? "Adding..." : "Add Logo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
