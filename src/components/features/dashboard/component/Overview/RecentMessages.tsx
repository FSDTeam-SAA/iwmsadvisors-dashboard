"use client";

import { useState } from "react";
import { useRecentMessages } from "../../hooks/useRecentMessages";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Loader2 } from "lucide-react";
import MessageDetailsModal from "./MessageDetailsModal";
import { ContactMessage } from "../../types/recentMessages.types";

export default function RecentMessages() {
  const { data: response, isLoading, isError } = useRecentMessages();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const recentMessages = response?.data || [];

  if (isLoading) {
    return (
      <Card className="border shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="flex items-center justify-center h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !response?.success) {
    return (
      <Card className="border shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="flex items-center justify-center h-[400px]">
          <p className="text-red-500 font-medium">
            Error loading recent messages
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6 px-8 pt-8">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-bold text-[#1E293B]">
              Recent Messages
            </CardTitle>
            <p className="text-sm font-medium text-gray-400">
              A moment that lingers, even when unseen
            </p>
          </div>
          <button className="text-sm font-bold text-gray-900 hover:underline">
            See all
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent px-8">
                <TableHead className="text-sm font-bold text-[#1E293B] px-8 py-5">
                  Client Name
                </TableHead>
                <TableHead className="text-sm font-bold text-[#1E293B] py-5">
                  Email
                </TableHead>
                <TableHead className="text-sm font-bold text-[#1E293B] py-5">
                  Phone Number
                </TableHead>
                <TableHead className="text-sm font-bold text-[#1E293B] py-5">
                  Services
                </TableHead>
                <TableHead className="text-sm font-bold text-[#1E293B] py-5 text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMessages.map((msg) => (
                <TableRow
                  key={msg._id}
                  className="group border-b-2 border-gray-50 hover:bg-gray-50 transition-colors px-2"
                >
                  <TableCell className="text-sm font-bold text-gray-600 px-8 py-6">
                    {msg.firstName} {msg.lastName}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-gray-500 py-6">
                    {msg.email}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-gray-500 py-6">
                    {msg.phone}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-gray-500 py-6">
                    {msg.service}
                  </TableCell>
                  <TableCell className="py-6 text-center">
                    <button
                      onClick={() => handleOpenModal(msg)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E0F2FE] text-[#008AFF] hover:bg-[#B9E6FE] transition-colors cursor-pointer"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MessageDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={selectedMessage}
      />
    </>
  );
}
