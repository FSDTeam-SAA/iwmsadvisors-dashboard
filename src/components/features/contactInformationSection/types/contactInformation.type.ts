// src/components/features/contactInformationSection/types/contactInformation.type.ts

export interface ContactInformation {
  _id: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  mapUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface ContactInformationResponse extends BaseResponse {
  data: ContactInformation;
}
