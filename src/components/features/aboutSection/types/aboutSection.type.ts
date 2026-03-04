// src/components/features/aboutSection/types/aboutSection.type.ts

export interface AboutSection {
  _id: string;
  title: string;
  subtitle: string;
  descriptionTitle: string;
  description: string;
  btnName: string;
  image: string; // URL string
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface AboutSectionResponse extends BaseResponse {
  data: AboutSection;
}

// For cases where it might be an array or for internal state
export interface AboutSectionsResponse extends BaseResponse {
  data: AboutSection[];
}
