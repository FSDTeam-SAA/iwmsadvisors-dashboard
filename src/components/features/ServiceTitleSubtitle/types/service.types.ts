// src/components/features/ServiceTitleSubtitle/types/service.types.ts

export interface ServiceTitle {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServiceTitleResponse {
  status: boolean;
  message: string;
  data: ServiceTitle[];
}

export interface SingleServiceTitleResponse {
  status: boolean;
  message: string;
  data: ServiceTitle;
}

export interface CreateServiceTitleDTO {
  title: string;
  subTitle: string;
}
