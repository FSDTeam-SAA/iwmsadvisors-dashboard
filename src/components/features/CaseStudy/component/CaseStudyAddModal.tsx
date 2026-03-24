"use client";

import { useEffect, useRef, useState } from "react";
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
import { X, Upload, Plus } from "lucide-react";
import Image from "next/image";

interface CaseStudyAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (newCaseStudy: {
    title: string;
    subtitle?: string;
    description: string;
    client?: string;
    duration?: string;
    teamSize?: string;
    challenge?: string;
    solution?: string;
    technologiesUsed: string[];
    resultImpact?: string;
    caseExperience?: string;
    clientName?: string;
    companyName?: string;
    imageFile?: File | null;
  }) => void;
}

export default function CaseStudyAddModal({
  isOpen,
  onClose,
  onSave,
}: CaseStudyAddModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    client: "",
    duration: "",
    teamSize: "",
    challenge: "",
    solution: "",
    technologiesUsed: [] as string[],
    resultImpact: "",
    caseExperience: "",
    clientName: "",
    companyName: "",
  });
  const [techInput, setTechInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

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
    onSave({ ...formData, imageFile });
    // Reset form after submission
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      client: "",
      duration: "",
      teamSize: "",
      challenge: "",
      solution: "",
      technologiesUsed: [],
      resultImpact: "",
      caseExperience: "",
      clientName: "",
      companyName: "",
    });
    setTechInput("");
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      client: "",
      duration: "",
      teamSize: "",
      challenge: "",
      solution: "",
      technologiesUsed: [],
      resultImpact: "",
      caseExperience: "",
      clientName: "",
      companyName: "",
    });
    setTechInput("");
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Add Case Study
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

          {/* Image Upload (modern UI) */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Image</Label>
            <input
              ref={fileInputRef}
              id="file"
              name="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                } else {
                  setImagePreview(null);
                }
              }}
            />

            <div className="flex flex-col items-center gap-4 text-center">
              <label
                htmlFor="file"
                className="relative group w-full max-w-[400px] h-48 mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Selected image preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <Plus className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center px-4">
                      Choose Image
                    </p>
                  </div>
                )}
              </label>

              {imagePreview && (
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-semibold text-[#0057B8] hover:bg-gray-50 hover:border-[#0057B8]/30 transition-all cursor-pointer group"
                  >
                    <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Change Image
                  </button>
                  <p className="text-xs text-gray-500">
                    Click to select a different image
                  </p>
                </div>
              )}
            </div>

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
              {formData.technologiesUsed.map((tech) => (
                <span
                  key={`add-tech-${tech}`}
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
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#0057B8] hover:bg-[#004494]"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
