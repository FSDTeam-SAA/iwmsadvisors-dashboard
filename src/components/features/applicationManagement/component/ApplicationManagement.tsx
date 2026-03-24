"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2, Plus } from "lucide-react";
import {
  useApplications,
  useDeleteApplication,
} from "../hooks/useApplicationManagement";
import ApplicationViewModal from "./ApplicationViewModal";
import { Application } from "../types/applicationManagement.type";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

export default function ApplicationManagement() {
  const { data: response, isLoading, isError } = useApplications();

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API returns all applications without pagination.
  const applications = response?.data || [];

  const handleOpenModal = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const { mutate: deleteApplication } = useDeleteApplication();

  const handleDelete = (id: string) => {
    const isConfirmed = globalThis.confirm(
      "Are you sure you want to delete this application?",
    );
    if (!isConfirmed) return;

    deleteApplication(id, {
      onSuccess: () => {
        toast.success("Application deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete application");
      },
    });
  };

  if (isError || (response && !response.status)) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#F9FAFB] rounded-xl border border-red-100">
        <p className="text-red-500 font-medium">Error loading applications</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Application Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all job applications from the careers page.
          </p>
        </div>
        {applications.length === 0 && (
          <Button
            className="bg-[#0057B8] hover:bg-[#004494]"
            onClick={() => {
              /* Logic to add or open add modal */
              toast.info("Add functionality to be implemented if needed");
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        )}
      </div>

      {/* Table Section */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Full Name
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Email
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Phone
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Applied Date
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={cn(isLoading && "opacity-50")}>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <TableRow
                    key={app._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center text-gray-700 font-medium whitespace-nowrap">
                      {app.fullName}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {app.email}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {app.phone}
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {format(new Date(app.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(app)}
                          className="p-2 bg-blue-600 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-2 bg-red-600 hover:bg-red-600 rounded-full transition-colors cursor-pointer"
                          title="Delete Application"
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
                    {isLoading
                      ? "Loading applications..."
                      : "No applications found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <ApplicationViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={selectedApplication}
      />
    </div>
  );
}
