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
import { toast } from "sonner";
import { useCreateStatsSection } from "../hooks/useStatsSection";
import { Plus, Trash2 } from "lucide-react";
import { StatsSectionItem } from "../types/statsSection.type";

interface StatsSectionAddModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function StatsSectionAddModal({
  isOpen,
  onClose,
}: StatsSectionAddModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [items, setItems] = useState<Omit<StatsSectionItem, "order">[]>([]);

  const { mutate: createSection, isPending } = useCreateStatsSection();

  const handleAddItem = () => {
    setItems([...items, { title: "", value: "", description: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (
    index: number,
    field: keyof Omit<StatsSectionItem, "order">,
    value: string,
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setItems([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subtitle) {
      toast.error("Both Title and Subtitle are required.");
      return;
    }

    if (items.length === 0) {
      toast.error("Please add at least one stat item.");
      return;
    }

    const invalidItem = items.find(
      (item) => !item.title || !item.value || !item.description,
    );
    if (invalidItem) {
      toast.error("All stat items must have Title, Value, and Description.");
      return;
    }

    // Prepare items with order
    const orderedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    createSection(
      { title, subtitle, items: orderedItems },
      {
        onSuccess: () => {
          toast.success("Stats section added successfully");
          handleClose();
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } };
          const errorMessage =
            err?.response?.data?.message || "Failed to add stats section";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Add New Stats Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Proven Results"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subtitle"
                className="text-sm font-medium text-gray-700"
              >
                Subtitle
              </label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Delivering measurable impact for our clients"
                required
              />
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between items-center pb-2">
                <label className="text-sm font-medium text-gray-700">
                  Stats Items
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                  className="h-8 gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Item
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-md border border-dashed">
                  No items added. Click &quot;Add Item&quot; to begin.
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={`new-item-${index}`}
                      className="p-4 bg-gray-50 border rounded-md space-y-3 relative"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="absolute right-3 top-3 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <h4 className="font-medium text-sm text-gray-700 pb-1 border-b">
                        Item {index + 1}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-600">
                            Value
                          </label>
                          <Input
                            value={item.value}
                            onChange={(e) =>
                              handleItemChange(index, "value", e.target.value)
                            }
                            placeholder="e.g. 30%"
                            className="h-8 text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-600">
                            Title
                          </label>
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              handleItemChange(index, "title", e.target.value)
                            }
                            placeholder="e.g. Space Optimization"
                            className="h-8 text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-medium text-gray-600">
                            Description
                          </label>
                          <Input
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="e.g. Average workspace efficiency gain"
                            className="h-8 text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              {isPending ? "Adding..." : "Add Stats Section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
