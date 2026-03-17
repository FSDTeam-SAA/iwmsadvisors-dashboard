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
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useUpdateTransformingNumber } from "../hooks/useTransformingNumber";
import { toast } from "sonner";
import {
  TransformingNumber,
  TransformingNumberItem,
} from "../types/transformingNumber.type";

interface TransformingNumberEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: TransformingNumber | null;
}

export default function TransformingNumberEditModal({
  isOpen,
  onClose,
  section,
}: TransformingNumberEditModalProps) {
  const [items, setItems] = useState<TransformingNumberItem[]>(section?.items || []);



  const { mutate: updateSection, isPending } = useUpdateTransformingNumber();

  const handleAddItem = () => {
    setItems([...items, { order: items.length + 1, value: "", label: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        order: i + 1,
      }));
    setItems(newItems);
  };

  const handleItemChange = (
    index: number,
    field: keyof TransformingNumberItem,
    value: string,
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!section) return;

    if (items.some((item) => !item.value.trim() || !item.label.trim())) {
      toast.error("Please fill in all values and labels");
      return;
    }

    updateSection(
      { items },
      {
        onSuccess: () => {
          toast.success("Number section updated successfully");
          onClose();
        },
        onError: () => toast.error("Failed to update number section"),
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Number Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-end bg-[#F8FAFC] p-4 rounded-xl border border-gray-100"
              >
                <div className="flex-1 space-y-2">
                  <Label className="text-sm font-bold text-gray-700">
                    Value
                  </Label>
                  <Input
                    placeholder="e.g. 15+"
                    value={item.value}
                    onChange={(e) =>
                      handleItemChange(index, "value", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex-[2] space-y-2">
                  <Label className="text-sm font-bold text-gray-700">
                    Label
                  </Label>
                  <Input
                    placeholder="e.g. Years Experience"
                    value={item.label}
                    onChange={(e) =>
                      handleItemChange(index, "label", e.target.value)
                    }
                    required
                  />
                </div>
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleAddItem}
            className="w-full border-dashed border-2 py-6 text-gray-500 hover:text-[#0057B8] hover:border-[#0057B8] hover:bg-blue-50 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add More Item
          </Button>

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
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
