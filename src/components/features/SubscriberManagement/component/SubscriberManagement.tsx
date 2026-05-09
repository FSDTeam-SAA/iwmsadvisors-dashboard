"use client";

import { useSubscribers, useDeleteSubscriber } from "../hooks/useSubscriber";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Trash2, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SubscriberManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: response,
    isLoading,
    isError,
  } = useSubscribers(currentPage, itemsPerPage);
  const { mutate: deleteSub } = useDeleteSubscriber();

  const subscribers = response?.data?.subscribers || [];
  const pagination = response?.data?.pagination;

  const handleDelete = (id: string) => {
    deleteSub(id, {
      onSuccess: () => {
        toast.success("Subscriber deleted successfully");
      },
      onError: (error: unknown) => {
        const message =
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to delete subscriber";
        toast.error(message);
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (!pagination) return [];
    const { totalPages } = pagination;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }
    return Array.from(new Set(pages));
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <p className="text-red-500 font-medium">Error loading subscribers</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Subscriber Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Subscriber Management
            </span>
          </nav>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Email
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Status
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
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <TableRow
                    key={sub._id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 text-center text-gray-700 font-medium">
                      {sub.email}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Badge
                        variant={sub.isSubscribed ? "default" : "destructive"}
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          sub.isSubscribed
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100",
                        )}
                      >
                        {sub.isSubscribed ? "Subscribed" : "Unsubscribed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleDelete(sub._id)}
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
                    colSpan={4}
                    className="py-10 text-center text-gray-400"
                  >
                    {isLoading ? "Loading subscribers..." : "No subscribers found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t flex flex-col md:flex-row items-center justify-between gap-4 bg-[#F8F9FA]">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, pagination.totalData)}
              </span>{" "}
              of <span className="font-medium">{pagination.totalData}</span>{" "}
              results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="p-2 border rounded-lg hover:bg-gray-50 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={cn(
                    "w-9 h-9 flex items-center justify-center rounded-lg font-medium transition-colors",
                    page === currentPage
                      ? "bg-[#0057B8] text-white"
                      : page === "..."
                        ? "text-gray-400 cursor-default"
                        : "border hover:bg-gray-50 text-gray-500 cursor-pointer",
                  )}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="p-2 border rounded-lg hover:bg-gray-50 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
