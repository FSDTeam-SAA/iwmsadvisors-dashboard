// src/components/features/contactServices/component/ContactServices.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Trash2, Edit, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useContactServicesTitles,
  useDeleteContactServicesTitle,
} from "../hooks/useContactServices";
import { ContactServiceTitle } from "../types/contactServices.type";
import ContactServicesAddModal from "./ContactServicesAddModal";
import ContactServicesEditModal from "./ContactServicesEditModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ContactServices() {
  const [selectedTitle, setSelectedTitle] = useState<ContactServiceTitle | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [titleToDelete, setTitleToDelete] = useState<string | null>(null);

  const { data: response, isLoading, isError } = useContactServicesTitles();
  const { mutate: deleteTitle, isPending: isDeleting } = useDeleteContactServicesTitle();

  const titles = response?.data || [];

  const handleEdit = (title: ContactServiceTitle) => {
    setSelectedTitle(title);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTitleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (titleToDelete) {
      deleteTitle(titleToDelete, {
        onSuccess: () => {
          toast.success("Title deleted successfully");
          setIsDeleteDialogOpen(false);
          setTitleToDelete(null);
        },
        onError: () => toast.error("Failed to delete title"),
      });
    }
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-medium">Error loading service titles</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Services</h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span>Content Management</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">Contact Services</span>
          </nav>
        </div>
        <div className="w-full md:w-auto flex md:justify-end">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#0057B8] hover:bg-[#004494] text-white font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Title
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-left pl-8">
                  Title
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-left">
                  Created At
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center pr-8 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {titles.length > 0 ? (
                titles.map((item: ContactServiceTitle) => (
                  <TableRow
                    key={item._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-left text-gray-700 font-medium pl-8">
                      {item.title}
                    </TableCell>
                    <TableCell className="py-4 text-left text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-4 text-center pr-8 whitespace-nowrap">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item._id)}
                          className="p-2 bg-red-600 hover:bg-red-500 rounded-full transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-16 text-center text-gray-400 italic bg-white"
                  >
                    {isLoading ? "Loading..." : "No service titles found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <ContactServicesAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ContactServicesEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTitle(null);
        }}
        titleData={selectedTitle}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the service title.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
