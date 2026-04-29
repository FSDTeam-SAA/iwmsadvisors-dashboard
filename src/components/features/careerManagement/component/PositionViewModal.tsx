// src/components/features/careerManagement/component/PositionViewModal.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Career } from "../types/career.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PositionViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  career: Career | null;
  applicationsContent?: React.ReactNode;
}

export default function PositionViewModal({
  isOpen,
  onClose,
  career,
  applicationsContent
}: PositionViewModalProps) {
  if (!career) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] h-[90vh] flex flex-col p-0 overflow-hidden rounded-xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0057B8]/10 flex items-center justify-center text-[#0057B8]">
                  <Briefcase className="w-5 h-5" />
                </div>
                {career.title}
                {(career.multiplePosition || career.isMultipleRoles) && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0057B8] border border-blue-100 uppercase tracking-wider">
                    Multiple Positions
                  </span>
                )}
              </DialogTitle>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium ml-1">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {career.location}</span>
                <span className="flex items-center capitalize"><Clock className="w-4 h-4 mr-1.5" /> {(Array.isArray(career.type) ? career.type : [career.type]).join(", ")}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {/* <Badge className="bg-[#0057B8]/10 text-[#0057B8] hover:bg-[#0057B8]/20 px-3 py-1 font-bold capitalize">
                {career.department}
              </Badge> */}
              {/* <Badge className={cn(
                "px-3 py-1 font-bold",
                (career.isActive ?? true)
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              )}>
                {(career.isActive ?? true) ? "Active" : "Inactive"}
              </Badge> */}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="px-6 border-b flex-shrink-0">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-8">
              <TabsTrigger
                value="details"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#0057B8] data-[state=active]:text-[#0057B8] rounded-none px-0 py-4 font-bold data-[state=active]:shadow-none data-[state=active]:bg-transparent text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                Job Details
              </TabsTrigger>
              <TabsTrigger
                value="applications"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#0057B8] data-[state=active]:text-[#0057B8] rounded-none px-0 py-4 font-bold data-[state=active]:shadow-none data-[state=active]:bg-transparent text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                Applications
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            <TabsContent value="details" className="m-0 space-y-8 animate-in fade-in duration-300">
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Job Description</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{career.description}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50/30 p-6 rounded-xl border border-blue-50">
                  <h3 className="text-sm font-bold text-[#0057B8] uppercase tracking-wider mb-3">Requirements</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{career.requirements}</div>
                </div>
                <div className="bg-emerald-50/30 p-6 rounded-xl border border-emerald-50">
                  <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3">Responsibilities</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{career.responsibilities}</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="m-0 h-full animate-in fade-in duration-300">
              {applicationsContent}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
