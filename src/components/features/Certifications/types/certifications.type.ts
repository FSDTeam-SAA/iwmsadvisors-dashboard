// src/components/features/Certifications/types/certifications.type.ts

export interface Certification {
  _id: string;
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  description3: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface CertificationsResponse extends BaseResponse {
  data: Certification[];
}

export interface CertificationResponse extends BaseResponse {
  data: Certification;
}

export interface CertificationCreateInput {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  description3: string;
}

export type CertificationUpdateInput = Partial<CertificationCreateInput>;
