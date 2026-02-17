import { useEffect, useMemo, useRef, useState } from "react";
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
import { X } from "lucide-react";
import Image from "next/image";
import { MrefSection } from "../types/mrefSection.types";

interface Capability {
  title: string;
  subtitles: string[];
}

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly section: MrefSection | null;
  readonly onSave: (
    payload: Partial<MrefSection> & { imageFile?: File },
  ) => void;
}

export default function MrefSectionEditModal({
  isOpen,
  onClose,
  section,
  onSave,
}: Props) {
  const initial = useMemo(
    () => ({
      title: section?.title ?? "",
      overview: section?.overview ?? "",
      subtitles: section?.subtitles ?? [],
      keyCapabilities: section?.keyCapabilities ?? [],
    }),
    [section],
  );

  const [title, setTitle] = useState(initial.title);
  const [overview, setOverview] = useState(initial.overview);
  const [subtitles, setSubtitles] = useState<string[]>(initial.subtitles);
  const [subtitleInput, setSubtitleInput] = useState("");

  const [caps, setCaps] = useState<Capability[]>(initial.keyCapabilities);
  const [capTitle, setCapTitle] = useState("");
  const [capSubtitleInput, setCapSubtitleInput] = useState("");
  const [capSubtitles, setCapSubtitles] = useState<string[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    section?.image?.url ?? null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:"))
        URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  if (!section) return null;

  const addSubtitle = () => {
    const v = subtitleInput.trim();
    if (v && !subtitles.includes(v)) {
      setSubtitles((prev) => [...prev, v]);
      setSubtitleInput("");
    }
  };

  const removeSubtitle = (v: string) => {
    setSubtitles((prev) => prev.filter((s) => s !== v));
  };

  const addCapSubtitle = () => {
    const v = capSubtitleInput.trim();
    if (v && !capSubtitles.includes(v)) {
      setCapSubtitles((prev) => [...prev, v]);
      setCapSubtitleInput("");
    }
  };

  const removeCapSubtitle = (v: string) => {
    setCapSubtitles((prev) => prev.filter((s) => s !== v));
  };

  const addCapability = () => {
    if (!capTitle.trim()) return;
    setCaps((prev) => [
      ...prev,
      { title: capTitle.trim(), subtitles: capSubtitles },
    ]);
    setCapTitle("");
    setCapSubtitles([]);
    setCapSubtitleInput("");
  };

  const removeCapability = (idx: number) => {
    setCaps((prev) => prev.filter((_, i) => i !== idx));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      overview,
      subtitles,
      keyCapabilities: caps,
      ...(imageFile ? { imageFile } : {}),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit MREF Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-bold text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Image</Label>
            <input
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                if (imagePreview && imagePreview.startsWith("blob:"))
                  URL.revokeObjectURL(imagePreview);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                } else {
                  setImagePreview(section?.image?.url ?? null);
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
                    alt={section.title}
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
                    setImagePreview(section?.image?.url ?? null);
                  }}
                  className="h-8"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="overview"
              className="text-sm font-bold text-gray-700"
            >
              Overview
            </Label>
            <Textarea
              id="overview"
              rows={4}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full resize-none"
              placeholder="Enter overview"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Subtitles</Label>
            <div className="flex gap-2">
              <Input
                value={subtitleInput}
                onChange={(e) => setSubtitleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSubtitle();
                  }
                }}
                placeholder="Add subtitle and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addSubtitle}
                className="bg-[#0057B8] hover:bg-[#004494]"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {subtitles.map((s, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#0057B8] text-white text-sm font-semibold rounded-lg flex items-center gap-2"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSubtitle(s)}
                    className="hover:bg:white/20 rounded-full p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-700">
              Key Capabilities
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  value={capTitle}
                  onChange={(e) => setCapTitle(e.target.value)}
                  placeholder="Capability title"
                />
                <div className="flex gap-2">
                  <Input
                    value={capSubtitleInput}
                    onChange={(e) => setCapSubtitleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCapSubtitle();
                      }
                    }}
                    placeholder="Add capability detail and press Enter"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addCapSubtitle}
                    className="bg-[#0057B8] hover:bg-[#004494]"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {capSubtitles.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#0057B8] text-white text-xs font-semibold rounded-lg flex items-center gap-2"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeCapSubtitle(s)}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={addCapability}
                  className="w-full bg-[#0057B8] hover:bg-[#004494]"
                >
                  Add Capability
                </Button>
              </div>
              <div className="space-y-2">
                {caps.map((cap, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-[#F8FAFC]">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{cap.title}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCapability(idx)}
                      >
                        Remove
                      </Button>
                    </div>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                      {cap.subtitles.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
              className="px-6 bg-[#0057B8] hover:bg-[#004494]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
