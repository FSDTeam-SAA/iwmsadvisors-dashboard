// src/components/features/careerManagement/component/CareerManagement.tsx

"use client";

import { useState } from "react";
import {
  useCareers,
  useDeleteCareer,
  useCareerApplications,
  useDeleteCareerApplication
} from "../hooks/useCareer";
import { Career, CareerApplication } from "../types/career.types";
import PositionTable from "./PositionTable";
import ApplicationTable from "./ApplicationTable";
import PositionModal from "./PositionModal";
import ApplicationViewModal from "./ApplicationViewModal";
import PositionViewModal from "./PositionViewModal";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronRight,
  LayoutGrid
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CareerManagement() {
  // State for Careers
  const [careerPage, setCareerPage] = useState(1);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [isPositionViewModalOpen, setIsPositionViewModalOpen] = useState(false);
  const [careerToEdit, setCareerToEdit] = useState<Career | null>(null);
  const [careerToDelete, setCareerToDelete] = useState<string | null>(null);

  // State for Applications
  const [applicationPage, setApplicationPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);

  // Queries
  const { data: careerData, isLoading: isLoadingCareers } = useCareers(careerPage, 10);
  const { data: applicationData, isLoading: isLoadingApplications } = useCareerApplications(
    applicationPage,
    10,
    selectedCareer?._id
  );

  // Mutations
  const { mutate: deleteCareerAction, isPending: isDeletingCareer } = useDeleteCareer();
  const { mutate: deleteAppAction, isPending: isDeletingApp } = useDeleteCareerApplication();

  // Handlers for Careers
  const handleAddNew = () => {
    setCareerToEdit(null);
    setIsPositionModalOpen(true);
  };

  const handleEditCareer = (career: Career) => {
    setCareerToEdit(career);
    setIsPositionModalOpen(true);
  };

  const handleViewPosition = (career: Career) => {
    setSelectedCareer(career);
    setApplicationPage(1);
    setIsPositionViewModalOpen(true);
  };

  const confirmDeleteCareer = () => {
    if (careerToDelete) {
      deleteCareerAction(careerToDelete, {
        onSuccess: () => setCareerToDelete(null),
      });
    }
  };

  // Handlers for Applications
  const handleViewApplication = (app: CareerApplication) => {
    setSelectedApplication(app);
    setIsApplicationModalOpen(true);
  };

  const confirmDeleteApplication = () => {
    if (applicationToDelete) {
      deleteAppAction(applicationToDelete, {
        onSuccess: () => setApplicationToDelete(null),
      });
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#F9FAFB] min-h-screen space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Career Management
          </h1>
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <span className="hover:text-[#0057B8] transition-colors cursor-pointer">Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="text-[#0057B8] font-bold">Careers</span>
          </nav>
        </div>

        <Button
          onClick={handleAddNew}
          className="bg-[#0057B8] hover:bg-[#004494] text-white px-6 h-12 rounded-xl border-none shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2 stroke-[3px]" />
          Add New Position
        </Button>
      </div>

      {/* Stats/Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0057B8]">
            <LayoutGrid className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Positions</p>
            <p className="text-2xl font-black text-gray-900">{careerData?.pagination?.total || 0}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BriefcaseIcon className="w-6 h-6 text-[#0057B8]" />
            Position List
          </h2>
        </div>
        <PositionTable
          data={careerData?.data || []}
          isLoading={isLoadingCareers}
          onView={handleViewPosition}
          onEdit={handleEditCareer}
          onDelete={(id) => setCareerToDelete(id)}
          currentPage={careerPage}
          totalPages={careerData?.pagination?.totalPages || 1}
          totalResults={careerData?.pagination?.total || 0}
          itemsPerPage={10}
          onPageChange={setCareerPage}
        />
      </div>

      {/* Modals */}
      <PositionModal
        key={careerToEdit?._id || (isPositionModalOpen ? "new" : "closed")}
        isOpen={isPositionModalOpen}
        onClose={() => {
          setIsPositionModalOpen(false);
          setCareerToEdit(null);
        }}
        career={careerToEdit}
      />

      <PositionViewModal
        isOpen={isPositionViewModalOpen}
        onClose={() => {
          setIsPositionViewModalOpen(false);
          setSelectedCareer(null);
        }}
        career={selectedCareer}
        applicationsContent={
          <ApplicationTable
            data={applicationData?.data || []}
            isLoading={isLoadingApplications}
            onView={handleViewApplication}
            onDelete={(id) => setApplicationToDelete(id)}
            currentPage={applicationPage}
            totalPages={applicationData?.pagination?.totalPages || 1}
            totalResults={applicationData?.pagination?.total || 0}
            itemsPerPage={10}
            onPageChange={setApplicationPage}
          />
        }
      />

      <ApplicationViewModal
        isOpen={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedApplication(null);
        }}
        application={selectedApplication}
      />

      {/* Delete Confirmation for Career */}
      <Dialog open={!!careerToDelete} onOpenChange={(open) => !open && setCareerToDelete(null)}>
        <DialogContent className="rounded-2xl sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Delete Position?</DialogTitle>
            <DialogDescription className="pt-2 text-gray-500 font-medium">
              Are you sure you want to delete this position? This action will also delete all associated applications and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setCareerToDelete(null)} className="flex-1 font-bold cursor-pointer">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCareer} disabled={isDeletingCareer} className="flex-1 font-bold cursor-pointer">
              {isDeletingCareer ? 'Deleting...' : 'Confirm Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation for Application */}
      <Dialog open={!!applicationToDelete} onOpenChange={(open) => !open && setApplicationToDelete(null)}>
        <DialogContent className="rounded-2xl sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Remove Application?</DialogTitle>
            <DialogDescription className="pt-2 text-gray-500 font-medium">
              Are you sure you want to remove this applicant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setApplicationToDelete(null)} className="flex-1 font-bold cursor-pointer">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteApplication} disabled={isDeletingApp} className="flex-1 font-bold cursor-pointer">
              {isDeletingApp ? 'Removing...' : 'Confirm Remove'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Simple icons for the UI
function BriefcaseIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
}
