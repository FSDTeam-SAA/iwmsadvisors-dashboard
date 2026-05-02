"use client";

import { useState } from "react";
import { ChevronRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useInsights,
  useCreateInsight,
  useUpdateInsight,
  useDeleteInsight,
} from "./hooks/useInsight";
import InsightModal from "./component/InsightModal";
import { InsightCard } from "./component/InsightCard";
import { Insight, CreateInsightDTO } from "./types/insight.types";

export default function RecentInsightsTitleSubtitle() {
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useInsights();
  const { mutate: createInsight, isPending: isCreating } = useCreateInsight();
  const { mutate: updateInsight, isPending: isUpdating } = useUpdateInsight();
  const { mutate: deleteInsight, isPending: isDeleting } = useDeleteInsight();

  const insights = response?.data || [];

  const handleAdd = () => {
    setSelectedInsight(null);
    setIsModalOpen(true);
  };

  const handleEdit = (insight: Insight) => {
    setSelectedInsight(insight);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this insight?")) {
      deleteInsight(id, {
        onSuccess: () => toast.success("Insight deleted successfully"),
        onError: () => toast.error("Failed to delete insight"),
      });
    }
  };

  const handleSave = (data: CreateInsightDTO) => {
    if (selectedInsight) {
      updateInsight(
        { id: selectedInsight._id, data },
        {
          onSuccess: () => {
            toast.success("Insight updated successfully");
            setIsModalOpen(false);
          },
          onError: () => toast.error("Failed to update insight"),
        }
      );
    } else {
      createInsight(data, {
        onSuccess: () => {
          toast.success("Insight created successfully");
          setIsModalOpen(false);
        },
        onError: () => toast.error("Failed to create insight"),
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
        <p className="text-red-500 font-medium">Error loading insights</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Recent Insights Title & Subtitle
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Recent Insights Title Subtitle
            </span>
          </nav>
        </div>

        {/* Show Add button only if there are no insights */}
        {insights.length === 0 && (
          <Button
            onClick={handleAdd}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Insight
          </Button>
        )}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          (isDeleting || isCreating || isUpdating) && "opacity-50 pointer-events-none"
        )}
      >
        {insights.length > 0 ? (
          insights.map((insight: Insight) => (
            <InsightCard
              key={insight._id}
              insight={insight}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg font-medium">
              No insights found
            </p>
            <Button
              variant="link"
              className="text-[#0057B8] mt-2 font-semibold cursor-pointer"
              onClick={handleAdd}
            >
              Create your first insight title & subtitle
            </Button>
          </div>
        )}
      </div>

      <InsightModal
        key={isModalOpen ? (selectedInsight?._id || "new") : "closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedInsight}
      />
    </div>
  );
}
