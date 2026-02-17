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
import { X, Plus } from "lucide-react";
import { FaqItem } from "../types/faqSection.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; subtitle: string; items: FaqItem[] }) => void;
}

export default function FaqSectionAddModal({ isOpen, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [items, setItems] = useState<FaqItem[]>([]);

  // Temporary state for new item input
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const resetAll = () => {
    setTitle("");
    setSubtitle("");
    setItems([]);
    setNewQuestion("");
    setNewAnswer("");
  };

  const close = () => {
    resetAll();
    onClose();
  };

  const addItem = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setItems((prev) => [
      ...prev,
      { question: newQuestion.trim(), answer: newAnswer.trim() },
    ]);
    setNewQuestion("");
    setNewAnswer("");
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, subtitle, items });
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Add FAQ Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-bold text-gray-700"
              >
                Title *
              </Label>
              <Input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="subtitle"
                className="text-sm font-bold text-gray-700"
              >
                Subtitle
              </Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Enter section subtitle"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <Label className="text-sm font-bold text-gray-700">Q&A Items</Label>

            <div className="bg-gray-50 p-4 rounded-lg space-y-4 border">
              <div className="space-y-2">
                <Input
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Question"
                />
                <Textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Answer"
                  className="resize-none"
                  rows={2}
                />
                <Button
                  type="button"
                  onClick={addItem}
                  className="w-full bg-[#0057B8] hover:bg-[#004494]"
                  disabled={!newQuestion.trim() || !newAnswer.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-white border rounded-lg shadow-sm"
                >
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-gray-900">
                      {item.question}
                    </p>
                    <p className="text-sm text-gray-600">{item.answer}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(idx)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-center text-gray-500 py-4 text-sm">
                  No items added yet.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={close}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-[#0057B8] hover:bg-[#004494]"
              disabled={!title}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
