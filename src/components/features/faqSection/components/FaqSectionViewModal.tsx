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

  const formattedDate = new Date(section.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            FAQ Section Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-lg text-gray-600 font-medium">
                {section.subtitle}
              </p>
            )}
            <p className="text-sm text-gray-400 pt-1">
              Created {formattedDate}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Q&A Items
            </p>
            {section.items && section.items.length > 0 ? (
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100"
                  >
                    <p className="font-semibold text-[#0057B8] mb-2">
                      {item.question}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No Q&A items found.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
