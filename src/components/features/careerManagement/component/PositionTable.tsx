// src/components/features/careerManagement/component/PositionTable.tsx

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
import { Career } from "../types/career.types";
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PositionTableProps {
  data: Career[];
  isLoading: boolean;
  onView: (career: Career) => void;
  onEdit: (career: Career) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function PositionTable({
  data = [],
  isLoading,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  currentPage,
  totalPages,
  totalResults,
  itemsPerPage,
  onPageChange,
}: PositionTableProps) {
  const columns: ColumnDef<Career>[] = [
    {
      accessorKey: "title",
      header: "Position Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0057B8]/5 flex items-center justify-center text-[#0057B8]">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900 flex items-center gap-2">
              {row.original.title}
              {(row.original.multiplePosition || row.original.isMultipleRoles) && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-[#0057B8] border border-blue-100 uppercase tracking-tighter">
                  Multiple
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">{row.original.department}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.isActive ?? true;
        return (
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold border",
            isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-gray-50 text-gray-500 border-gray-100"
          )}>
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span className="text-gray-600 font-medium">{row.original.location}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="capitalize px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0057B8] border border-blue-100">
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Posted On",
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
      id: "toggle",
      header: () => <div className="text-center">Status(Inactive/Active)</div>,
      cell: ({ row }) => {
        const isActive = row.original.isActive ?? true;
        return (
          <div className="flex items-center justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isActive}
                onChange={() => onToggleStatus(row.original._id, !isActive)}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0057B8]"></div>
            </label>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onView(row.original); }}
            className="p-2 bg-[#0057B8] hover:bg-[#004494] text-white rounded-lg transition-all shadow-sm cursor-pointer"
            title="Review Details & Applications"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(row.original); }}
            className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all shadow-sm cursor-pointer"
            title="Edit Position"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(row.original._id); }}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-sm cursor-pointer"
            title="Delete Position"
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
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                  className="hover:bg-[#0057B8]/5 border-b border-gray-50 transition-colors group"
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
                  No positions found.
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
            <span className="text-gray-900">{totalResults}</span> careers
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
