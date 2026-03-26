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
import { useUpdateStatsSection } from "../hooks/useStatsSection";
import { Plus, Trash2 } from "lucide-react";
import { StatsSection, StatsSectionItem } from "../types/statsSection.type";

interface StatsSectionEditModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly statsSection: StatsSection | null;
}

export default function StatsSectionEditModal({
  isOpen,
  onClose,
  statsSection,
}: StatsSectionEditModalProps) {
  const [title, setTitle] = useState(statsSection?.title || "");
  const [subtitle, setSubtitle] = useState(statsSection?.subtitle || "");
  const [items, setItems] = useState<StatsSectionItem[]>(statsSection?.items ? [...statsSection.items] : []);

  const { mutate: updateSection, isPending } = useUpdateStatsSection();



  const handleAddItem = () => {
    // Determine the next order number based on existing items
    const maxOrder = items.reduce((max, item) => Math.max(max, item.order), 0);
    setItems([
      ...items,
      { order: maxOrder + 1, title: "", value: "", description: "" },
    ]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!statsSection) return;

    if (!title) {
      toast.error("Title is required");
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

    // Ensure order is sequential starting from 1
    const orderedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    updateSection(
      {
        id: statsSection._id,
        data: {
          title,
          subtitle,
          items: orderedItems,
        },
      },
      {
        onSuccess: () => {
          toast.success("Stats section updated successfully");
          onClose();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Failed to update stats section";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-[#1E293B]">
            Edit Stats Section
          </DialogTitle>
        </DialogHeader>

        {statsSection && (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="edit-title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Proven Results"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-subtitle"
                  className="text-sm font-medium text-gray-700"
                >
                  Subtitle
                </label>
                <Input
                  id="edit-subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Delivering measurable impact for our clients"
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
                    No items found. Click &quot;Add Item&quot; to begin.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div
                        key={item.order || index}
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
                        <h4 className="font-bold text-xl text-gray-700 pb-1 border-b">
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
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#0057B8] text-white hover:bg-[#004494]"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
