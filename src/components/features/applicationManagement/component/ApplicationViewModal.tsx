"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Application } from "../types/applicationManagement.type";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";

interface ApplicationViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

export default function ApplicationViewModal({
  isOpen,
  onClose,
  application,
}: ApplicationViewModalProps) {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold">
            Application Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Full Name
              </span>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                {application.fullName}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Email Address
              </span>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md truncate">
                {application.email}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Phone Number
              </span>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                {application.phone}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Applied Date
              </span>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                {format(new Date(application.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {application.portfolioUrl && (
              <div className="space-y-1">
                <span className="text-sm font-medium text-gray-500">
                  Portfolio Link
                </span>
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0057B8] bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors truncate"
                >
                  <span className="truncate">{application.portfolioUrl}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            )}
            {application.linkedinProfile && (
              <div className="space-y-1">
                <span className="text-sm font-medium text-gray-500">
                  LinkedIn Profile
                </span>
                <a
                  href={application.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#0057B8] bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors truncate"
                >
                  <span className="truncate">
                    {application.linkedinProfile}
                  </span>
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>
            )}
          </div>

          {application.resumeCV && (
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Resume/CV
              </span>
              <div>
                <a
                  href={application.resumeCV}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#0057B8] hover:bg-[#004494] px-4 py-2 rounded-md transition-colors"
                >
                  View Resume
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {application.coverLetter && (
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Cover Letter
              </span>
              <div className="text-sm text-gray-900 bg-gray-50 px-4 py-3 rounded-md whitespace-pre-wrap border border-gray-100 leading-relaxed min-h-[100px]">
                {application.coverLetter}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
