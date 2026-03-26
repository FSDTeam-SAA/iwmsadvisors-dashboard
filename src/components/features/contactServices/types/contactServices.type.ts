// src/components/features/contactServices/types/contactServices.type.ts

export interface ContactServiceTitle {
  _id: string;
  title: string;
  createdAt: string;
}

export interface ContactServicesResponse {
  success: boolean;
  data: ContactServiceTitle[];
}

export interface CreateTitleRequest {
  title: string;
}

export interface UpdateTitleRequest {
  title: string;
}

export interface BaseResponse {
  success: boolean;
  message?: string;
}
