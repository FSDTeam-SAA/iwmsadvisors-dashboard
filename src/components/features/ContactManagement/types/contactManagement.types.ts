export interface ContactFile {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path?: string;
  publicId?: string;
}

export interface Contact {
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

export interface ContactPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ContactManagementResponse {
  success: boolean;
  message: string;
  data: Contact[];
  pagination: ContactPagination;
}
