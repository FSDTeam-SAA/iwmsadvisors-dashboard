// src/components/features/careerManagement/component/PositionModal.tsx

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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Career, CareerType } from "../types/career.types";
import { useCreateCareer, useUpdateCareer } from "../hooks/useCareer";
import { Loader2 } from "lucide-react";

interface PositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  career?: Career | null;
}

export default function PositionModal({
  isOpen,
  onClose,
  career,
}: PositionModalProps) {
  const isEditing = !!career;
  const { mutate: createCareer, isPending: isCreating } = useCreateCareer();
  const { mutate: updateCareer, isPending: isUpdating } = useUpdateCareer();

  const [formData, setFormData] = useState({
    title: career?.title || "",
    role: career?.role || "",
    department: career?.department || "",
    location: career?.location || "",
    type: (Array.isArray(career?.type) 
      ? career?.type 
      : career?.type 
        ? [career.type === "full time" ? "full-time" : career.type] 
        : []) as CareerType[],
    description: career?.description || "",
    requirements: career?.requirements || "",
    responsibilities: career?.responsibilities || "",
    isActive: career?.isActive ?? true,
    multiplePosition: career?.multiplePosition ?? (career?.isMultipleRoles || false),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.requirements) newErrors.requirements = "Requirements are required";
    if (!formData.responsibilities) newErrors.responsibilities = "Responsibilities are required";
    if (formData.type.length === 0) newErrors.type = "At least one employment type is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleTypeChange = (type: CareerType) => {
    setFormData((prev) => {
      const types = prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type];
      
      return { ...prev, type: types };
    });
    
    if (errors.type) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.type;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing && career) {
      updateCareer(
        { id: career._id, data: formData },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createCareer(formData, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            {isEditing ? "Update Position" : "Publish New Position"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-bold text-gray-700">Position Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Software Engineer"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-bold text-gray-700">Role / Level</Label>
              <Input
                id="role"
                name="role"
                placeholder="e.g. Senior"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
              <input
                type="checkbox"
                id="multiplePosition"
                name="multiplePosition"
                checked={formData.multiplePosition}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-[#0057B8] focus:ring-[#0057B8] cursor-pointer"
              />
              <Label 
                htmlFor="multiplePosition" 
                className="text-sm font-semibold text-gray-700 cursor-pointer select-none"
              >
                Multiple positions available
              </Label>
            </div>

            <div className="flex items-center space-x-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer"
              />
              <Label 
                htmlFor="isActive" 
                className="text-sm font-semibold text-gray-700 cursor-pointer select-none"
              >
                Position is Active
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-bold text-gray-700">Department *</Label>
              <Input
                id="department"
                name="department"
                placeholder="e.g. Engineering"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? "border-red-500" : ""}
              />
              {errors.department && <p className="text-xs text-red-500 font-medium">{errors.department}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold text-gray-700">Employment Type *</Label>
              <div className="flex flex-wrap gap-4 pt-1">
                {[
                  { id: "full-time", label: "Full-time" },
                  { id: "part-time", label: "Part-time" },
                  { id: "contract", label: "Contract" },
                ].map((option) => (
                  <label 
                    key={option.id}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.type.includes(option.id as CareerType)}
                        onChange={() => handleTypeChange(option.id as CareerType)}
                        className="w-5 h-5 rounded border-gray-300 text-[#0057B8] focus:ring-[#0057B8] cursor-pointer"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#0057B8] transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.type && <p className="text-xs text-red-500 font-medium">{errors.type}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-bold text-gray-700">Location *</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. Remote / London, UK"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-xs text-red-500 font-medium">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-bold text-gray-700">Job Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Briefly describe the role..."
              className={cn("min-h-[120px] resize-none", errors.description ? "border-red-500" : "")}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-sm font-bold text-gray-700">Requirements *</Label>
            <Textarea
              id="requirements"
              name="requirements"
              placeholder="List key requirements..."
              className={cn("min-h-[120px] resize-none", errors.requirements ? "border-red-500" : "")}
              value={formData.requirements}
              onChange={handleChange}
            />
            {errors.requirements && <p className="text-xs text-red-500 font-medium">{errors.requirements}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities" className="text-sm font-bold text-gray-700">Responsibilities *</Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              placeholder="List key responsibilities..."
              className={cn("min-h-[120px] resize-none", errors.responsibilities ? "border-red-500" : "")}
              value={formData.responsibilities}
              onChange={handleChange}
            />
            {errors.responsibilities && <p className="text-xs text-red-500 font-medium">{errors.responsibilities}</p>}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t sticky bottom-0 bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="px-6 bg-[#0057B8] hover:bg-[#004494] font-bold cursor-pointer"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Position" : "Publish Position"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
