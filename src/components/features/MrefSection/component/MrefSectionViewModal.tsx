import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { MrefSection } from "../types/mrefSection.types";

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly section: MrefSection | null;
}

export default function MrefSectionViewModal({ isOpen, onClose, section }: Props) {
  if (!section) return null;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(section.createdAt));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">MREF Section Details</DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {section.image?.url && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
              <Image src={section.image.url} alt={section.title} fill className="object-cover" />
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
            <p className="text-sm text-gray-500">Created {formattedDate}</p>
          </div>

          {section.subtitles?.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subtitles</p>
              <div className="flex flex-wrap gap-2">
                {section.subtitles.map((st, i) => (
                  <span key={i} className="px-4 py-2 bg-[#0057B8] text-white text-sm font-semibold rounded-lg">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          )}

          {section.overview && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overview</p>
              <div className="bg-[#F8FAFC] rounded-2xl p-6">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{section.overview}</p>
              </div>
            </div>
          )}

          {section.keyCapabilities?.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Key Capabilities</p>
              <div className="space-y-3">
                {section.keyCapabilities.map((cap, i) => (
                  <div key={i} className="bg-[#EFF6FF] rounded-2xl p-6 border border-blue-100">
                    <p className="text-sm font-semibold text-gray-800">{cap.title}</p>
                    <ul className="mt-2 list-disc pl-5 text-gray-600 text-sm">
                      {cap.subtitles.map((s, j) => (
                        <li key={j}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
