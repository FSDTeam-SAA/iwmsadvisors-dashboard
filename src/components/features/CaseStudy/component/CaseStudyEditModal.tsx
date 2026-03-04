"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CaseStudy } from "../types/casestudy.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";

interface CaseStudyEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly caseStudy: CaseStudy | null;
  readonly onSave: (
    updatedCaseStudy: Partial<CaseStudy> & { imageFile?: File },
  ) => void;
}

export default function CaseStudyEditModal({
  isOpen,
  onClose,
  caseStudy,
  onSave,
}: CaseStudyEditModalProps) {
  const initialFormData = useMemo(
    () => ({
      title: caseStudy?.title || "",
      subtitle: caseStudy?.subtitle || "",
      description: caseStudy?.description || "",
      client: caseStudy?.client || "",
      duration: caseStudy?.duration || "",
      teamSize: caseStudy?.teamSize || "",
      challenge: caseStudy?.challenge || "",
      solution: caseStudy?.solution || "",
      technologiesUsed: caseStudy?.technologiesUsed || [],
      resultImpact: caseStudy?.resultImpact || "",
      caseExperience: caseStudy?.caseExperience || "",
      clientName: caseStudy?.clientName || "",
      companyName: caseStudy?.companyName || "",
    }),
    [caseStudy],
  );

  const [formData, setFormData] = useState(initialFormData);
  const [techInput, setTechInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Set default preview to existing image when modal opens or caseStudy changes
  useEffect(() => {
    if (caseStudy?.image?.url) {
      setImagePreview(caseStudy.image.url);
    } else {
      setImagePreview(null);
    }
    // Clean up object URL if any from previous selection
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy]);

  // Reset form when the selected case study changes
  // Note: This is a valid use case for syncing form state with props
  useEffect(() => {
    if (caseStudy) {
      setFormData({
        title: caseStudy.title || "",
        subtitle: caseStudy.subtitle || "",
        description: caseStudy.description || "",
        client: caseStudy.client || "",
        duration: caseStudy.duration || "",
        teamSize: caseStudy.teamSize || "",
        challenge: caseStudy.challenge || "",
        solution: caseStudy.solution || "",
        technologiesUsed: caseStudy.technologiesUsed || [],
        resultImpact: caseStudy.resultImpact || "",
        caseExperience: caseStudy.caseExperience || "",
        clientName: caseStudy.clientName || "",
        companyName: caseStudy.companyName || "",
      });
      setTechInput("");
    }
  }, [caseStudy]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTechnology = () => {
    if (
      techInput.trim() &&
      !formData.technologiesUsed.includes(techInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologiesUsed: [...prev.technologiesUsed, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologiesUsed: prev.technologiesUsed.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ...(imageFile ? { imageFile } : {}),
    });
    onClose();
  };

  if (!caseStudy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Case Study
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-bold text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter case study title"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label
              htmlFor="subtitle"
              className="text-sm font-bold text-gray-700"
            >
              Subtitle
            </Label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter subtitle"
            />
          </div>

          {/* Image Preview and Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-bold text-gray-700">
              Image
            </Label>
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                if (imagePreview && imagePreview.startsWith("blob:")) {
                  URL.revokeObjectURL(imagePreview);
                }
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                } else {
                  setImagePreview(caseStudy?.image?.url ?? null);
                }
              }}
            />
            <div
              className="border-2 border-dashed rounded-xl p-4 bg-[#F8FAFC] hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={imagePreview}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <p className="text-sm font-medium">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs">PNG, JPG up to ~5MB</p>
                  <Button
                    type="button"
                    className="mt-3 bg-[#0057B8] hover:bg-[#004494]"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose Image
                  </Button>
                </div>
              )}
            </div>
            {imageFile && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500 truncate">
                  {imageFile.name}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setImageFile(null);
                    if (imagePreview && imagePreview.startsWith("blob:")) {
                      URL.revokeObjectURL(imagePreview);
                    }
                    setImagePreview(caseStudy?.image?.url ?? null);
                  }}
                  className="h-8"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-bold text-gray-700"
            >
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full resize-none"
              placeholder="Enter case study description"
            />
          </div>

          {/* Client Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="client"
                className="text-sm font-bold text-gray-700"
              >
                Client
              </Label>
              <Input
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="Enter client name"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="companyName"
                className="text-sm font-bold text-gray-700"
              >
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
          </div>

          {/* Duration and Team Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="duration"
                className="text-sm font-bold text-gray-700"
              >
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 12 Months"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="teamSize"
                className="text-sm font-bold text-gray-700"
              >
                Team Size
              </Label>
              <Input
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                placeholder="e.g., 200 Members"
              />
            </div>
          </div>

          {/* Challenge */}
          <div className="space-y-2">
            <Label
              htmlFor="challenge"
              className="text-sm font-bold text-gray-700"
            >
              Challenge
            </Label>
            <Textarea
              id="challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none"
              placeholder="Describe the challenge"
            />
          </div>

          {/* Solution */}
          <div className="space-y-2">
            <Label
              htmlFor="solution"
              className="text-sm font-bold text-gray-700"
            >
              Solution
            </Label>
            <Textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none"
              placeholder="Describe the solution"
            />
          </div>

          {/* Technologies Used */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">
              Technologies Used
            </Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTechnology();
                  }
                }}
                placeholder="Add technology and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTechnology}
                className="bg-[#0057B8] hover:bg-[#004494]"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.technologiesUsed.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#0057B8] text-white text-sm font-semibold rounded-lg flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Result Impact */}
          <div className="space-y-2">
            <Label
              htmlFor="resultImpact"
              className="text-sm font-bold text-gray-700"
            >
              Result & Impact
            </Label>
            <Textarea
              id="resultImpact"
              name="resultImpact"
              value={formData.resultImpact}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none"
              placeholder="Describe the results and impact"
            />
          </div>

          {/* Case Experience */}
          <div className="space-y-2">
            <Label
              htmlFor="caseExperience"
              className="text-sm font-bold text-gray-700"
            >
              Case Experience
            </Label>
            <Textarea
              id="caseExperience"
              name="caseExperience"
              value={formData.caseExperience}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none"
              placeholder="Describe the case experience"
            />
          </div>

          {/* Client Name */}
          <div className="space-y-2">
            <Label
              htmlFor="clientName"
              className="text-sm font-bold text-gray-700"
            >
              Client Contact Name
            </Label>
            <Input
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter client contact name"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#0057B8] hover:bg-[#004494] cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
