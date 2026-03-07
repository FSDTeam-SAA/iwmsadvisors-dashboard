// src/components/features/Expertise/types/expertise.type.ts

export interface Expertise {
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

export interface ExpertiseListResponse extends BaseResponse {
  data: Expertise[];
}

export interface ExpertiseResponse extends BaseResponse {
  data: Expertise;
}

export interface ExpertiseCreateInput {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  description3: string;
}

export type ExpertiseUpdateInput = Partial<ExpertiseCreateInput>;
