// src/components/features/careerManagement/component/ApplicationTable.tsx

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CareerApplication } from "../types/career.types";
import { Eye, ChevronLeft, ChevronRight, User, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ApplicationTableProps {
  data: CareerApplication[];
  isLoading: boolean;
  onView: (application: CareerApplication) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function ApplicationTable({
  data = [],
  isLoading,
  onView,
  onDelete,
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  onPageChange,
}: ApplicationTableProps) {
  const columns: ColumnDef<CareerApplication>[] = [
    {
      accessorKey: "name",
      header: "Applicant",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.original.name}</div>
            <div className="text-xs text-gray-500">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <span className="text-gray-600 font-medium">{row.original.phone}</span>,
    },
    {
      accessorKey: "resume",
      header: "Resume",
      cell: ({ row }) => {
        const hasResumeFile = !!row.original.resumeFile?.url;
        const hasResumeLink = !!row.original.resumeLink;
        return (
          <div className="flex items-center gap-2">
            {(hasResumeFile || hasResumeLink) ? (
               <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 gap-1.5 py-1">
                 <FileText className="w-3.5 h-3.5" />
                 Ready
               </Badge>
            ) : (
                <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-100 py-1">
                N/A
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusConfig = {
          pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
          shortlisted: "bg-green-100 text-green-700 border-green-200",
          rejected: "bg-red-100 text-red-700 border-red-200",
        };
        return (
          <Badge className={cn("capitalize px-3 py-1 font-bold", statusConfig[status] || "bg-gray-100")}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Applied Date",
      cell: ({ row }) => (
        <span className="text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(row.original)}
            className="p-2 bg-[#0057B8] hover:bg-[#004494] text-white rounded-lg transition-all shadow-sm cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(row.original._id)}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-sm cursor-pointer"
            title="Delete Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-gray-100">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-gray-900 font-bold py-4">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j} className="py-4">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-[#0057B8]/5 border-b border-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-gray-500 font-medium"
                >
                  No applications found for this position.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && data.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-2">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, totalResults)}</span> of{" "}
            <span className="text-gray-900">{totalResults}</span> applicants
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <Button
                  key={index}
                  variant={page === currentPage ? "default" : "outline"}
                  onClick={() => typeof page === "number" && onPageChange(page)}
                  disabled={page === "..."}
                  className={cn(
                    "h-9 w-9 p-0 font-bold cursor-pointer",
                    page === currentPage 
                      ? "bg-[#0057B8] hover:bg-[#004494] text-white" 
                      : "border-gray-200 text-gray-600 hover:bg-gray-50",
                    page === "..." && "border-none hover:bg-transparent"
                  )}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
