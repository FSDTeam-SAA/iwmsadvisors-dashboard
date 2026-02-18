export interface ServicePageImage {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path?: string;
}

export interface ServicePageFaq {
  question: string;
  answer: string;
  _id?: string;
}

export interface ServicePage {
  _id: string;
  image: ServicePageImage;
  heading: string;
  subtitles: string[];
  title: string;
  guideline: string;
  description: string;
  faq: ServicePageFaq[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServicePagePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ServicePageResponse {
  success: boolean;
  message: string;
  data: ServicePage[];
  pagination: ServicePagePagination;
}
