// src/components/features/CareerTitleSubtitle/types/careerTitle.types.ts

export interface CareerTitle {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CareerTitleResponse {
  status: boolean;
  message: string;
  data: CareerTitle[];
}

export interface SingleCareerTitleResponse {
  status: boolean;
  message: string;
  data: CareerTitle;
}

export interface CreateCareerTitleDTO {
  title: string;
  subTitle: string;
}
