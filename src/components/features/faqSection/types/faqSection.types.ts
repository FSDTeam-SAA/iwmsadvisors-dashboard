export interface FaqItem {
  question: string;
  answer: string;
  _id?: string;
}

export interface FaqSection {
  _id?: string;
   question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface FaqPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FaqResponse {
  success: boolean;
  message: string;
  data: FaqSection[];
  pagination: FaqPagination;
}

export type CreateFaqSectionData = Omit<
  FaqSection,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;
