"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateStrength,
  useUpdateStrength,
} from "../hooks/useStrengthSection";
import { StrengthSection } from "../types/strengthSection.type";

interface StrengthSectionHeaderModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly section: StrengthSection | null;
}

export default function StrengthSectionHeaderModal({
  isOpen,
  onClose,
  section,
}: StrengthSectionHeaderModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const { mutate: createSection, isPending: isCreating } = useCreateStrength();
  const { mutate: updateSection, isPending: isUpdating } = useUpdateStrength();

  const [prevSection, setPrevSection] = useState<StrengthSection | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(false);

  if (section !== prevSection || isOpen !== prevIsOpen) {
    setPrevSection(section);
    setPrevIsOpen(isOpen);
    if (section && isOpen) {
      setTitle(section.title);
      setSubtitle(section.subtitle);
    } else if (!section && isOpen) {
      setTitle("");
      setSubtitle("");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (section) {
      updateSection(
        { id: section._id, data: { title, subtitle } },
        { onSuccess: onClose },
      );
    } else {
      createSection({ title, subtitle }, { onSuccess: onClose });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {section ? "Edit Strength Section" : "Create Strength Section"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Our Core Strengths"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="subtitle" className="text-sm font-medium">
              Subtitle
            </label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. We measure success by the real-world results..."
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#0057B8] hover:bg-[#004494]"
            >
              {isPending
                ? "Saving..."
                : section
                  ? "Update Section"
                  : "Create Section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
