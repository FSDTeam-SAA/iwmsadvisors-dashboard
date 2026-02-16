"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MessageDetailsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly message: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    createdAt: string;
    file?: {
      originalName: string;
      mimeType: string;
      url: string;
    };
  } | null;
}

export default function MessageDetailsModal({
  isOpen,
  onClose,
  message,
}: MessageDetailsModalProps) {
  if (!message) return null;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(message.createdAt));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Message Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Name
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {message.firstName} {message.lastName}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {message.email}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Phone Number
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {message.phone}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Service
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {message.service}
              </p>
            </div>
          </div>

          {/* Message Body */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Message
            </p>
            <div className="bg-[#F8FAFC] rounded-2xl p-6 min-h-[150px]">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {message.message}
              </p>
            </div>
          </div>

          {/* Attachments */}
          {message.file && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Attachments File
              </p>
              <a
                href={message.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer group"
              >
                <div className="w-12 h-14 bg-[#E11D48] rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-[10px] font-bold text-white uppercase">
                    {message.file.mimeType.split("/")[1]?.toUpperCase() ||
                      "PDF"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#0057B8] transition-colors">
                    {message.file.originalName}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    Received {formattedDate}
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
