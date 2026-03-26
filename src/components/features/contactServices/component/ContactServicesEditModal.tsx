// src/components/features/contactServices/component/ContactServicesEditModal.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpdateContactServicesTitle } from "../hooks/useContactServices";
import { ContactServiceTitle } from "../types/contactServices.type";

interface ContactServicesEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly titleData: ContactServiceTitle | null;
}

export default function ContactServicesEditModal({
  isOpen,
  onClose,
  titleData,
}: ContactServicesEditModalProps) {
  const [title, setTitle] = useState("");
  const { mutate: updateTitle, isPending } = useUpdateContactServicesTitle();

  useEffect(() => {
    if (titleData && titleData.title !== title) {
      setTitle(titleData.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleData]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleData) return;
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    updateTitle(
      { id: titleData._id, data: { title } },
      {
        onSuccess: () => {
          toast.success("Title updated successfully");
          handleClose();
        },
        onError: (error: unknown) => {
          const axiosError = error as { response?: { data?: { message?: string } } };
          toast.error(axiosError?.response?.data?.message || "Failed to update title");
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Service Title
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="edit-title"
                className="text-sm font-medium text-gray-700"
              >
                Service Title
              </label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. My First Title"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0057B8] text-white hover:bg-[#004494]"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
