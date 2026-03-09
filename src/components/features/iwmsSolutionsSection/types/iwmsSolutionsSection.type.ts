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
