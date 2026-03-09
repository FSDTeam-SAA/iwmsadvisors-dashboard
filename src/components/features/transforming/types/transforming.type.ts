// src/components/features/transforming/types/transforming.type.ts

export interface TransformSection {
  _id: string;
  title: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface TransformSectionsResponse extends BaseResponse {
  data: TransformSection[];
}

export interface TransformSectionResponse extends BaseResponse {
  data: TransformSection;
}

export interface TransformSectionCreateInput {
  title: string;
  description: string;
  image1?: File | null;
  image2?: File | null;
  image3?: File | null;
}

export interface TransformSectionUpdateInput {
  title?: string;
  description?: string;
  image1?: File | null;
  image2?: File | null;
  image3?: File | null;
}
