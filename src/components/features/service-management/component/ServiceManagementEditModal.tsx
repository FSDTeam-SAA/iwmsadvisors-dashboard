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
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { ServicePage } from "../types/service-management.types";

interface ServiceManagementEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly servicePage: ServicePage | null;
  readonly onSave: (
    data: Partial<ServicePage> & {
      subtitles?: string[];
      faq?: { question: string; answer: string }[];
      imageFile?: File | null;
    },
  ) => void;
}

export default function ServiceManagementEditModal({
  isOpen,
  onClose,
  servicePage,
  onSave,
}: ServiceManagementEditModalProps) {
  const [formData, setFormData] = useState({
    heading: "",
    title: "",
    guideline: "",
    description: "",
  });
  const [subtitles, setSubtitles] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (servicePage) {
      setFormData({
        heading: servicePage.heading,
        title: servicePage.title,
        guideline: servicePage.guideline,
        description: servicePage.description,
      });
      setSubtitles(servicePage.subtitles.length ? servicePage.subtitles : [""]);
      setFaqs(
        servicePage.faq.length
          ? servicePage.faq.map(({ question, answer }) => ({
              question,
              answer,
            }))
          : [{ question: "", answer: "" }],
      );
      setImagePreview(servicePage.image?.url || null);
    }
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicePage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubtitleChange = (index: number, value: string) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index] = value;
    setSubtitles(newSubtitles);
  };

  const addSubtitle = () => setSubtitles([...subtitles, ""]);

  const removeSubtitle = (index: number) => {
    const newSubtitles = subtitles.filter((_, i) => i !== index);
    setSubtitles(newSubtitles.length ? newSubtitles : [""]);
  };

  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);

  const removeFaq = (index: number) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs.length ? newFaqs : [{ question: "", answer: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      subtitles: subtitles.filter((s) => s.trim() !== ""),
      faq: faqs.filter(
        (f) => f.question.trim() !== "" || f.answer.trim() !== "",
      ),
      imageFile,
    });
    onClose();
  };

  if (!servicePage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Service Page
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Heading */}
          <div className="space-y-2">
            <Label
              htmlFor="heading"
              className="text-sm font-bold text-gray-700"
            >
              Heading *
            </Label>
            <Input
              id="heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

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
            />
          </div>

          {/* Subtitles */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-gray-700">
                Subtitles
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addSubtitle}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Subtitle
              </Button>
            </div>
            {subtitles.map((subtitle, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={subtitle}
                  onChange={(e) => handleSubtitleChange(index, e.target.value)}
                  placeholder={`Subtitle ${index + 1}`}
                  className="w-full"
                />
                {subtitles.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeSubtitle(index)}
                    className="px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Guideline */}
          <div className="space-y-2">
            <Label
              htmlFor="guideline"
              className="text-sm font-bold text-gray-700"
            >
              Guideline *
            </Label>
            <Textarea
              id="guideline"
              name="guideline"
              value={formData.guideline}
              onChange={handleChange}
              required
              rows={3}
              className="w-full resize-none"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Image</Label>
            <input
              ref={fileInputRef}
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
                  setImagePreview(servicePage.image?.url || null);
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
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <p className="text-sm font-medium">Click to upload image</p>
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
            />
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-gray-700">FAQs</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addFaq}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" /> Add FAQ
              </Button>
            </div>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg space-y-3 relative group"
              >
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {faqs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFaq(index)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-gray-500">
                    Question {index + 1}
                  </Label>
                  <Input
                    value={faq.question}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                    placeholder="Enter question"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">
                    Answer {index + 1}
                  </Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                    placeholder="Enter answer"
                    rows={2}
                    className="mt-1 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0057B8] hover:bg-[#004494]">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
