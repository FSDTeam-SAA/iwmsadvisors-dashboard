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

const RichContent = ({ value }: { value: string }) => {
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(value);

  if (hasHtml) {
    return (
      <div
        className="text-sm text-gray-600 leading-relaxed font-medium [&_a]:text-[#0057B8] [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <div className="space-y-2 text-sm text-gray-600 leading-relaxed font-medium">
      {value.split(/\r?\n/).map((line, index) => (
        <p key={`${line}-${index}`}>{line}</p>
      ))}
    </div>
  );
};

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Created
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {formattedDate}
              </p>
            </div>
          </div>

          {caseStudy.customer && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Customer
              </p>
              <div className="bg-[#F8FAFC] rounded-2xl p-6">
                <RichContent value={caseStudy.customer} />
              </div>
            </div>
          )}

          {caseStudy.challenge && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Challenge
              </p>
              <div className="bg-[#FEF2F2] rounded-2xl p-6 border border-red-100">
                <RichContent value={caseStudy.challenge} />
              </div>
            </div>
          )}

          {caseStudy.solution && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Solution
              </p>
              <div className="bg-[#F0FDF4] rounded-2xl p-6 border border-green-100">
                <RichContent value={caseStudy.solution} />
              </div>
            </div>
          )}

          {caseStudy.benefit && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Benefits
              </p>
              <div className="bg-[#EFF6FF] rounded-2xl p-6 border border-blue-100">
                <RichContent value={caseStudy.benefit} />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
