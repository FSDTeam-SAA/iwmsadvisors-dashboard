"use client";

import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BannerSection as BannerSectionType } from "../types/bannerSection.type";
import {
  useBannerSections,
  useCreateBannerSection,
  useDeleteBannerSection,
  useUpdateBannerSection,
} from "../hooks/useBannerSection";
import BannerSectionAddModal from "./BannerSectionAddModal";
import BannerSectionEditModal from "./BannerSectionEditModal";
import BannerSectionViewModal from "./BannerSectionViewModal";
import { BannerCard } from "./BannerCard";
import Image from "next/image";

export default function BannerSection() {
  const [selectedBanner, setSelectedBanner] =
    useState<BannerSectionType | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: response, isLoading, isError } = useBannerSections();
  const { mutate: createBanner } = useCreateBannerSection();
  const { mutate: updateBanner } = useUpdateBannerSection();
  const { mutate: deleteBanner } = useDeleteBannerSection();

  const banners = response?.data || [];

  const handleView = (banner: BannerSectionType) => {
    setSelectedBanner(banner);
    setIsViewModalOpen(true);
  };

  const handleEdit = (banner: BannerSectionType) => {
    setSelectedBanner(banner);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteBanner(id, {
      onSuccess: () => toast.success("Banner deleted successfully"),
      onError: () => toast.error("Failed to delete banner"),
    });
  };

  const handleSave = (
    updatedData: Partial<BannerSectionType> & { imageFile?: File },
  ) => {
    if (selectedBanner) {
      updateBanner(
        { id: selectedBanner._id, data: updatedData },
        {
          onSuccess: () => {
            toast.success("Banner updated successfully");
            setIsEditModalOpen(false);
          },
          onError: () => toast.error("Failed to update banner"),
        },
      );
    }
  };

  const handleCreate = (newData: {
    title: string;
    subTitle?: string;
    btn1?: string;
    btn2?: string;
    imageFile?: File | null;
  }) => {
    const { imageFile, ...rest } = newData;
    createBanner(
      { ...rest, imageFile: imageFile || undefined },
      {
        onSuccess: () => {
          toast.success("Banner added successfully");
          setIsAddModalOpen(false);
        },
        onError: () => toast.error("Failed to add banner"),
      },
    );
  };

  if (isError || (response && !response.status)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <p className="text-red-500 font-medium">
          Error loading banner sections
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Banner Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">Banner Management</span>
          </nav>
        </div>
        {!banners.length && (
          <div className="w-full md:w-auto flex md:justify-end">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </div>
        )}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8",
          isLoading && "opacity-50 transition-opacity",
        )}
      >
        {banners.length > 0 ? (
          banners.map((banner: BannerSectionType) => (
            <BannerCard
              key={banner._id}
              banner={banner}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Image
                src="/no-data.svg"
                alt="No data"
                width={64}
                height={64}
                className="opacity-20"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <p className="text-gray-400 text-lg font-medium">
              No banners found
            </p>
            <button
              className="text-[#0057B8] hover:underline mt-2 font-semibold cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            >
              Create your first banner
            </button>
          </div>
        )}
      </div>

      <BannerSectionViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        bannerSection={selectedBanner}
      />

      <BannerSectionEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bannerSection={selectedBanner}
        onSave={handleSave}
      />

      <BannerSectionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
