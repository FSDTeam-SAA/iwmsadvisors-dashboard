"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Navbar } from "../types/navbar.type";

interface NavbarViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly navbar: Navbar | null;
}

export default function NavbarViewModal({
  isOpen,
  onClose,
  navbar,
}: NavbarViewModalProps) {
  if (!navbar) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Navbar Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Logo Info */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Logo Preview
            </Label>
            <div className="flex justify-center p-6 bg-gray-50 rounded-xl border border-dashed text-gray-400">
              {navbar.logo ? (
                <div className="relative w-64 h-32">
                  <Image
                    src={navbar.logo}
                    alt="Navbar Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
                  <span className="italic">No logo available</span>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t text-xs text-gray-400">
            <div>
              <span className="font-semibold text-gray-500">Created At:</span>{" "}
              {new Date(navbar.createdAt).toLocaleString()}
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-500">Last Updated:</span>{" "}
              {new Date(navbar.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
