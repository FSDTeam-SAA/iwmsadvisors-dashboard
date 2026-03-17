// src/components/features/consultant/types/consultant.type.ts

export interface Consultant {
  _id: string;
  title: string;
  description: string;
  btnName: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ConsultantResponse {
  status: boolean;
  message: string;
  data: Consultant[];
}

export interface ConsultantFormData {
  title: string;
  description: string;
  btnName: string;
}
