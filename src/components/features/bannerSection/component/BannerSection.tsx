"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2, Edit, Plus, ChevronRight } from "lucide-react";
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
        {/* <div className="w-full md:w-auto flex md:justify-end">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Banner
          </Button>
        </div> */}
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Image
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Subtitle
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Date
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {banners.length > 0 ? (
                banners.map((banner: BannerSectionType) => (
                  <TableRow
                    key={banner._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center">
                      <div className="relative w-12 h-12 mx-auto rounded-lg overflow-hidden bg-gray-100">
                        {banner.image ? (
                          <Image
                            src={banner.image}
                            alt={banner.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            N/A
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-700 font-medium">
                      {banner.title}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {banner.subTitle || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {new Date(banner.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleView(banner)}
                          className="p-2 bg-[#489EFF] hover:bg-[#CCE7FF] rounded-full transition-colors cursor-pointer"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleEdit(banner)}
                          className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors cursor-pointer"
                        >
                          <Edit className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-gray-400"
                  >
                    No banners found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

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
