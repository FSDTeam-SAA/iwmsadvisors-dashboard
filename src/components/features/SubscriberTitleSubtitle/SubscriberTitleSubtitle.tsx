// src/components/features/SubscriberTitleSubtitle/SubscriberTitleSubtitle.tsx

"use client";

import { useState } from "react";
import { ChevronRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useSubscriberTitles,
  useCreateSubscriberTitle,
  useUpdateSubscriberTitle,
  useDeleteSubscriberTitle,
} from "./hooks/useSubscriber";
import SubscriberModal from "./component/SubscriberModal";
import { SubscriberCard } from "./component/SubscriberCard";
import { SubscriberTitle, CreateSubscriberTitleDTO } from "./types/subscriber.types";

export default function SubscriberTitleSubtitle() {
  const [selectedSubscriberTitle, setSelectedSubscriberTitle] = useState<SubscriberTitle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useSubscriberTitles();
  const { mutate: createSubscriberTitle, isPending: isCreating } = useCreateSubscriberTitle();
  const { mutate: updateSubscriberTitle, isPending: isUpdating } = useUpdateSubscriberTitle();
  const { mutate: deleteSubscriberTitle, isPending: isDeleting } = useDeleteSubscriberTitle();

  const subscriberTitles = response?.data || [];

  const handleAdd = () => {
    setSelectedSubscriberTitle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (subscriberTitle: SubscriberTitle) => {
    setSelectedSubscriberTitle(subscriberTitle);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {

      deleteSubscriberTitle(id, {
        onSuccess: () => toast.success("Subscriber title deleted successfully"),
        onError: () => toast.error("Failed to delete subscriber title"),
      });
  };

  const handleSave = (data: CreateSubscriberTitleDTO) => {
    if (selectedSubscriberTitle) {
      updateSubscriberTitle(
        { id: selectedSubscriberTitle._id, data },
        {
          onSuccess: () => {
            toast.success("Subscriber title updated successfully");
            setIsModalOpen(false);
          },
          onError: () => toast.error("Failed to update subscriber title"),
        }
      );
    } else {
      createSubscriberTitle(data, {
        onSuccess: () => {
          toast.success("Subscriber title created successfully");
          setIsModalOpen(false);
        },
        onError: () => toast.error("Failed to create subscriber title"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#0057B8]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading subscriber titles</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Subscriber Titles & Description
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Subscriber Titles Description
            </span>
          </nav>
        </div>

        {/* Show Add button only if there are no subscriber titles */}
        {subscriberTitles.length === 0 && (
          <Button
            onClick={handleAdd}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subscriber Title
          </Button>
        )}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          (isDeleting || isCreating || isUpdating) && "opacity-50 pointer-events-none"
        )}
      >
        {subscriberTitles.length > 0 ? (
          subscriberTitles.map((subscriberTitle: SubscriberTitle) => (
            <SubscriberCard
              key={subscriberTitle._id}
              subscriberTitle={subscriberTitle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg font-medium">
              No subscriber titles found
            </p>
            <Button
              variant="link"
              className="text-[#0057B8] mt-2 font-semibold cursor-pointer"
              onClick={handleAdd}
            >
              Create your first subscriber title & description
            </Button>
          </div>
        )}
      </div>

      <SubscriberModal
        key={isModalOpen ? (selectedSubscriberTitle?._id || "new") : "closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedSubscriberTitle}
      />
    </div>
  );
}
