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
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  ChevronRight, 
  ArrowLeft,
  LayoutGrid,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function CareerManagement() {
  // State for Careers
  const [careerPage, setCareerPage] = useState(1);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [careerToEdit, setCareerToEdit] = useState<Career | null>(null);
  const [careerToDelete, setCareerToDelete] = useState<string | null>(null);

  // State for Applications
  const [applicationPage, setApplicationPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);

  // View state: 'careers' or 'applications'
  const [view, setView] = useState<'careers' | 'applications'>('careers');

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

  const handleViewApplications = (career: Career) => {
    setSelectedCareer(career);
    setApplicationPage(1);
    setView('applications');
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

  const handleBackToCareers = () => {
    setView('careers');
    setSelectedCareer(null);
  };

  return (
    <div className="p-4 md:p-8 bg-[#F9FAFB] min-h-screen space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {view === 'careers' ? 'Career Management' : 'Application Review'}
          </h1>
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <span className="hover:text-[#0057B8] transition-colors cursor-pointer" onClick={handleBackToCareers}>Dashboard</span>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className={cn(view === 'careers' ? "text-[#0057B8] font-bold" : "text-gray-500")}>Careers</span>
            {view === 'applications' && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
                <span className="text-[#0057B8] font-bold truncate max-w-[200px]">
                  {selectedCareer?.title}
                </span>
              </>
            )}
          </nav>
        </div>

        {view === 'careers' ? (
          <Button
            onClick={handleAddNew}
            className="bg-[#0057B8] hover:bg-[#004494] text-white px-6 h-12 rounded-xl border-none shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2 stroke-[3px]" />
            Add New Position
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={handleBackToCareers}
            className="text-gray-600 hover:text-[#0057B8] hover:bg-[#0057B8]/5 transition-all font-bold cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Positions
          </Button>
        )}
      </div>

      {/* Stats/Quick Info (Optional but adds to premium feel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0057B8]">
                <LayoutGrid className="w-7 h-7" />
            </div>
            <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Positions</p>
                <p className="text-2xl font-black text-gray-900">{careerData?.pagination?.total || 0}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Users className="w-7 h-7" />
            </div>
            <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Applications</p>
                <p className="text-2xl font-black text-gray-900">
                    {view === 'applications' ? applicationData?.pagination?.total || 0 : 'Select a position'}
                </p>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {view === 'careers' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <BriefcaseIcon className="w-6 h-6 text-[#0057B8]" />
                    Position List
                </h2>
            </div>
            <PositionTable
              data={careerData?.data || []}
              isLoading={isLoadingCareers}
              onView={(career) => handleViewApplications(career)}
              onEdit={handleEditCareer}
              onDelete={(id) => setCareerToDelete(id)}
              currentPage={careerPage}
              totalPages={careerData?.pagination?.totalPages || 1}
              totalResults={careerData?.pagination?.total || 0}
              itemsPerPage={10}
              onPageChange={setCareerPage}
            />
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-600 text-white hover:bg-blue-600">Featured</Badge>
                        <h2 className="text-2xl font-black text-gray-900">{selectedCareer?.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                        <span className="flex items-center"><MapPinIcon className="w-4 h-4 mr-1.5 text-gray-400" /> {selectedCareer?.location}</span>
                        <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5 text-gray-400" /> {selectedCareer?.type}</span>
                        <span className="flex items-center text-[#0057B8]"><Users className="w-4 h-4 mr-1.5 text-blue-400" /> {applicationData?.pagination?.total || 0} Applicants</span>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                    <Button variant="outline" className="flex-1 md:flex-none border-gray-200 font-bold cursor-pointer" onClick={() => handleEditCareer(selectedCareer!)}>
                        Edit Position
                    </Button>
                </div>
             </div>

             <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 px-2 pt-2">
                    <UsersIcon className="w-6 h-6 text-[#0057B8]" />
                    Applicant List
                </h2>
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
             </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <PositionModal
        isOpen={isPositionModalOpen}
        onClose={() => {
            setIsPositionModalOpen(false);
            setCareerToEdit(null);
        }}
        career={careerToEdit}
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
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}

function UsersIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}

function MapPinIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
}

function ClockIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
