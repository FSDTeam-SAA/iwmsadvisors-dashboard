// src/components/features/careerManagement/component/ApplicationViewModal.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CareerApplication, ApplicationStatus } from "../types/career.types";
import { useUpdateApplicationStatus } from "../hooks/useCareer";
import { FileText, Mail, Phone, ExternalLink, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ApplicationViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: CareerApplication | null;
}

export default function ApplicationViewModal({
  isOpen,
  onClose,
  application,
}: ApplicationViewModalProps) {
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();

  if (!application) return null;

  const handleStatusUpdate = (status: ApplicationStatus) => {
    updateStatus(
      { id: application._id, status },
      {
        onSuccess: () => {
          // Status updated, we can keep modal open or close it
        },
      }
    );
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    shortlisted: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  const resumeUrl = application.resumeFile?.url || application.resumeLink;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <div className="flex justify-between items-center pr-6">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Applicant Details
            </DialogTitle>
            <Badge className={cn("capitalize px-3 py-1", statusColors[application.status])}>
              {application.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row gap-6 border-b pb-6">
            <div className="h-20 w-20 rounded-full bg-[#0057B8]/10 flex items-center justify-center text-[#0057B8] text-2xl font-bold">
              {application.name.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
              <p className="text-gray-500 font-medium">
                Applied for: <span className="text-[#0057B8]">
                  {typeof application.careerId === 'object' ? application.careerId.title : 'Position'}
                </span>
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-1.5" />
                  {application.email}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-1.5" />
                  {application.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Details Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Cover Letter / Note</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 min-h-[100px] whitespace-pre-wrap">
                {application.coverLetter || application.notes || "No cover letter provided."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resume / CV</h3>
                {resumeUrl ? (
                  <div className="bg-[#0057B8]/5 border border-[#0057B8]/20 rounded-lg p-4 flex items-center justify-between group hover:bg-[#0057B8]/10 transition-colors cursor-pointer"
                       onClick={() => window.open(resumeUrl, '_blank')}>
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#0057B8]" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
                          {application.resumeFile?.originalName || "Resume File"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {application.resumeFile?.size ? `${(application.resumeFile.size / 1024).toFixed(1)} KB` : "Click to view"}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#0057B8]" />
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No resume provided.</p>
                )}
              </div>

              {application.portfolioLink && (
                 <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Portfolio</h3>
                    <a href={application.portfolioLink} target="_blank" rel="noreferrer" 
                       className="text-sm text-[#0057B8] hover:underline flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      View Portfolio
                    </a>
                 </div>
              )}
            </div>
          </div>

          {/* Administrative Actions */}
          <div className="border-t pt-6 bg-gray-50 -mx-6 px-6 -mb-4 pb-6 mt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Review Decision</h3>
            <div className="flex gap-4">
              <Button
                onClick={() => handleStatusUpdate("shortlisted")}
                disabled={isPending || application.status === "shortlisted"}
                className="bg-green-600 hover:bg-green-700 text-white flex-1 cursor-pointer"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                Shortlist Candidate
              </Button>
              <Button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={isPending || application.status === "rejected"}
                variant="destructive"
                className="flex-1 cursor-pointer"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
                Reject Application
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
