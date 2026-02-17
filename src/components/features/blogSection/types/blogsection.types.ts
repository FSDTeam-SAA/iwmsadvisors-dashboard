export interface BlogSectionImage {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url?: string;
  path?: string;
}

export interface BlogSection {
  _id: string;
  image: BlogSectionImage;
  title: string;
  subtitle?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface BlogSectionPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogSectionResponse {
  success: boolean;
  message: string;
  data: BlogSection[];
  pagination: BlogSectionPagination;
}
