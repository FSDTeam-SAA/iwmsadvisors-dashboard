// src/components/features/contactServices/types/contactServices.type.ts

export interface ContactServiceTitle {
  _id: string;
  title: string;
  order?: number;
  createdAt: string;
}

export interface ContactServicesResponse {
  success: boolean;
  data: ContactServiceTitle[];
}

export interface CreateTitleRequest {
  title: string;
  order?: number;
}

export interface UpdateTitleRequest {
  title: string;
  order?: number;
}

export interface BaseResponse {
  success: boolean;
  message?: string;
}
