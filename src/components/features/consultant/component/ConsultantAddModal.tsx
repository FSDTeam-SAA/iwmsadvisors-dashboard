// src/components/features/consultant/component/ConsultantAddModal.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateConsultant } from "../hooks/useConsultant";
import { toast } from "sonner";
import { ConsultantFormData } from "../types/consultant.type";

interface ConsultantAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ConsultantAddModal({
  isOpen,
  onClose,
}: ConsultantAddModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultantFormData>();

  const { mutate: createConsultant } = useCreateConsultant();

  const onSubmit = (data: ConsultantFormData) => {
    createConsultant(data, {
      onSuccess: () => {
        toast.success("Consultant created successfully");
        reset();
        onClose();
      },
      onError: () => {
        toast.error("Failed to create consultant");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Consultant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Senior Business Strategy Consultant"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Expert advice on scaling your SaaS startup..."
              className="resize-none h-32"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="btnName">Button Name</Label>
            <Input
              id="btnName"
              placeholder="e.g., Book Consultation"
              {...register("btnName", { required: "Button name is required" })}
            />
            {errors.btnName && (
              <p className="text-sm text-red-500">{errors.btnName.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#0057B8] text-white">
              {isSubmitting ? "Creating..." : "Create Consultant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
