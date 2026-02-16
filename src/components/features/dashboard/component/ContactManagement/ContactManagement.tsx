"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";

const contacts = [
  {
    name: "Jenny Wilson",
    email: "example@gmail.com",
    phone: "(205) 555-0100",
    service: "IWMS Consulting",
  },
  {
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "(205) 555-0111",
    service: "IWMS Implementation",
  },
  {
    name: "Laura Johnson",
    email: "laura.johnson@example.com",
    phone: "(205) 555-0122",
    service: "System Integration",
  },
  {
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "(205) 555-0133",
    service: "Managed Support",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(205) 555-0144",
    service: "IWMS Consulting",
  },
  {
    name: "Christopher Wilson",
    email: "chris.wilson@example.com",
    phone: "(205) 555-0155",
    service: "IWMS Implementation",
  },
  {
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    phone: "(205) 555-0166",
    service: "System Integration",
  },
  {
    name: "Daniel Anderson",
    email: "daniel.anderson@example.com",
    phone: "(205) 555-0177",
    service: "Managed Support",
  },
  {
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    phone: "(205) 555-0188",
    service: "IWMS Consulting",
  },
  {
    name: "David Garcia",
    email: "david.garcia@example.com",
    phone: "(205) 555-0199",
    service: "IWMS Implementation",
  },
  {
    name: "Maria Martinez",
    email: "maria.martinez@example.com",
    phone: "(205) 555-0200",
    service: "System Integration",
  },
  {
    name: "Robert Hernandez",
    email: "robert.hernandez@example.com",
    phone: "(205) 555-0211",
    service: "Managed Support",
  },
  {
    name: "Linda Lopez",
    email: "linda.lopez@example.com",
    phone: "(205) 555-0222",
    service: "IWMS Consulting",
  },
];

export default function ContactManagement() {
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Contact Management
          </h1>
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-gray-900 font-medium">
              Contact Management
            </span>
          </nav>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Date Range</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
            <span>Service Name</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8F9FA]">
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Client Name
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Email
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Phone Number
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Service Name
                </TableHead>
                <TableHead className="py-4 text-gray-600 font-bold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.email}
                  className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="py-4 text-center text-gray-700 font-medium">
                    {contact.name}
                  </TableCell>
                  <TableCell className="py-4 text-center text-gray-600">
                    {contact.email}
                  </TableCell>
                  <TableCell className="py-4 text-center text-gray-600">
                    {contact.phone}
                  </TableCell>
                  <TableCell className="py-4 text-center text-gray-600">
                    {contact.service}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <button className="p-2 bg-[#E1F1FF] hover:bg-[#CCE7FF] rounded-full text-[#008AFF] transition-colors">
                      <Eye className="w-5 h-5 fill-current" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4 border-t">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">5</span> of{" "}
            <span className="font-medium">12</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-50 text-gray-400">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0057B8] text-white font-medium">
              1
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-gray-50 text-gray-500">
              ..
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-gray-50 text-gray-500">
              50
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50 text-gray-400">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
