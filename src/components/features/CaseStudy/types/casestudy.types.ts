// src/components/features/CaseStudy/types/casestudy.types.ts

export interface CaseStudyImage {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url?: string;
  path?: string;
}

export interface CaseStudy {
  _id: string;
  image: CaseStudyImage;
  title: string;
  description: string;
  subtitle?: string;
  client?: string;
  duration?: string;
  teamSize?: string;
  challenge?: string;
  solution?: string;
  technologiesUsed: string[];
  resultImpact?: string;
  caseExperience?: string;
  clientName?: string;
  companyName?: string;
  benefit?: string;
  customer?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CaseStudyPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CaseStudyResponse {
  success: boolean;
  message: string;
  data: CaseStudy[];
  pagination: CaseStudyPagination;
}
