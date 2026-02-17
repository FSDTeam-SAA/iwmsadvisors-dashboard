export interface MrefImage {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url?: string;
  path?: string;
}

export interface MrefCapability {
  title: string;
  subtitles: string[];
}

export interface MrefSection {
  _id: string;
  image?: MrefImage;
  title: string;
  subtitles: string[];
  overview: string;
  keyCapabilities: MrefCapability[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface MrefPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MrefResponse {
  success: boolean;
  message: string;
  data: MrefSection[];
  pagination: MrefPagination;
}

export type CreateMrefSectionData =
  | (Omit<MrefSection, "_id" | "createdAt" | "updatedAt" | "__v"> & {
      imageFile?: File;
    })
  | FormData;
