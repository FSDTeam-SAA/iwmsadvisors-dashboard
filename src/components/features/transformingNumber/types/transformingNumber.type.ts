// src/components/features/transformingNumber/types/transformingNumber.type.ts

export interface TransformingNumberItem {
  order: number;
  value: string;
  label: string;
}

export interface TransformingNumber {
  _id: string;
  items: TransformingNumberItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TransformingNumberResponse {
  status: boolean;
  message: string;
  data: TransformingNumber | null;
}

export interface TransformingNumberCreateInput {
  items: TransformingNumberItem[];
}

export interface TransformingNumberUpdateInput {
  items: TransformingNumberItem[];
}
