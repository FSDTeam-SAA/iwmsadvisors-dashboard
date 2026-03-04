// src/components/features/bannerSection/types/bannerSection.type.ts

export interface BannerSection {
  _id: string;
  image: string; // URL string
  title: string;
  subTitle?: string;
  btn1?: string;
  btn2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BannerSectionResponse {
  status: boolean;
  message: string;
  data: BannerSection[];
}
