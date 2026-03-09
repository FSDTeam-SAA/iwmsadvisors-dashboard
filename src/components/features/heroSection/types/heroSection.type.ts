// src/components/features/heroSection/types/heroSection.type.ts

export interface HeroSection {
  _id: string;
  order: number;
  title: string;
  subtitle: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface HeroSectionsResponse extends BaseResponse {
  data: HeroSection[];
}

export interface HeroSectionResponse extends BaseResponse {
  data: HeroSection;
}
