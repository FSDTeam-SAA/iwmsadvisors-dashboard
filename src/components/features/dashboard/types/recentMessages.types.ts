export interface ContactFile {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
}

export interface ContactMessage {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  file?: ContactFile;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RecentMessagesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RecentMessagesResponse {
  success: boolean;
  message: string;
  data: ContactMessage[];
  pagination: RecentMessagesPagination;
}
