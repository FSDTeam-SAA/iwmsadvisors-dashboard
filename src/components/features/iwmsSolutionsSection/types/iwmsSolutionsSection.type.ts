// src/components/features/iwmsSolutionsSection/types/iwmsSolutionsSection.type.ts

export interface IwmsSolutionsItem {
  order: number;
  icon: string; // URL string
  title: string;
  description: string;
}

export interface IwmsSolutionsSection {
  _id: string;
  order: number;
  title: string;
  subtitle: string;
  items: IwmsSolutionsItem[];
  createdAt: string;
  updatedAt: string;
}

export interface IwmsSolutionsSectionPayload {
  order?: number;
  title?: string;
  subtitle?: string;
  items?: Partial<IwmsSolutionsItem>[];
  [key: string]: string | number | object | File | undefined;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface IwmsSolutionsSectionResponse extends BaseResponse {
  data: IwmsSolutionsSection;
}

export interface IwmsSolutionsSectionsResponse extends BaseResponse {
  data: IwmsSolutionsSection[];
}
