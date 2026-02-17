"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CaseStudy } from "../types/casestudy.types";
import Image from "next/image";

interface CaseStudyViewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly caseStudy: CaseStudy | null;
}

export default function CaseStudyViewModal({
  isOpen,
  onClose,
  caseStudy,
}: CaseStudyViewModalProps) {
  if (!caseStudy) return null;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(caseStudy.createdAt));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Case Study Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Case Study Image */}
          {caseStudy.image?.url && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={caseStudy.image.url}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {caseStudy.title}
            </h2>
            {caseStudy.subtitle && (
              <p className="text-lg text-gray-600">{caseStudy.subtitle}</p>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Client
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {caseStudy.client || caseStudy.companyName || "N/A"}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Duration
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {caseStudy.duration || "N/A"}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Team Size
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {caseStudy.teamSize || "N/A"}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Created
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Description
            </p>
            <div className="bg-[#F8FAFC] rounded-2xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {caseStudy.description}
              </p>
            </div>
          </div>

          {/* Challenge */}
          {caseStudy.challenge && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Challenge
              </p>
              <div className="bg-[#FEF2F2] rounded-2xl p-6 border border-red-100">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {caseStudy.challenge}
                </p>
              </div>
            </div>
          )}

          {/* Solution */}
          {caseStudy.solution && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Solution
              </p>
              <div className="bg-[#F0FDF4] rounded-2xl p-6 border border-green-100">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          )}

          {/* Technologies Used */}
          {caseStudy.technologiesUsed.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Technologies Used
              </p>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologiesUsed.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#0057B8] text-white text-sm font-semibold rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Result Impact */}
          {caseStudy.resultImpact && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Result & Impact
              </p>
              <div className="bg-[#EFF6FF] rounded-2xl p-6 border border-blue-100">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {caseStudy.resultImpact}
                </p>
              </div>
            </div>
          )}

          {/* Case Experience */}
          {caseStudy.caseExperience && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Case Experience
              </p>
              <div className="bg-[#F8FAFC] rounded-2xl p-6">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {caseStudy.caseExperience}
                </p>
              </div>
            </div>
          )}

          {/* Client Information */}
          {caseStudy.clientName && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Client Name
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {caseStudy.clientName}
                </p>
              </div>
              {caseStudy.companyName && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Company Name
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {caseStudy.companyName}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
