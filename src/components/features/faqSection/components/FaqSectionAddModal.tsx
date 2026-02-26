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


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { question: string; answer: string }) => void;
}

export default function FaqSectionAddModal({ isOpen, onClose, onSave }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const resetAll = () => {
    setQuestion("");
    setAnswer("");
  };

  const close = () => {
    resetAll();
    onClose();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSave({ question: question.trim(), answer: answer.trim() });
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

        <form onSubmit={submit} className="px-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="question"
                className="text-sm font-bold text-gray-700"
              >
                Question *
              </Label>
              <Input
                id="question"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter question"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="answer"
                className="text-sm font-bold text-gray-700"
              >
                Answer *
              </Label>
              <Textarea
                id="answer"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter answer"
                className="resize-none"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 mb-5 border-t">
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
              disabled={!question.trim() || !answer.trim()}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
