import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaqSection } from "../types/faqSection.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  section: FaqSection | null;
}

export default function FaqSectionViewModal({
  isOpen,
  onClose,
  section,
}: Props) {
  if (!section) return null;

  const formattedDate = section.createdAt
    ? new Date(section.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            FAQ Section Details
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 ">
          <div className="space-y-2">
            <p className="text-sm text-gray-400 pt-1">
              Created {formattedDate}
            </p>
          </div>

          <div className="space-y-2">
            <div className=" pt-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Question
              </p>
              <p className="font-semibold text-[#0057B8] text-lg">
                {section.question || "N/A"}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Answer
              </p>
              <p className="text-gray-700 leading-relaxed">
                {section.answer || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
