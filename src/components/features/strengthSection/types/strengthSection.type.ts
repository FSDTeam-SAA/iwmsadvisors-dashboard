export interface StrengthSection {
  _id: string;
  title: string;
  subtitle: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StrengthItem {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StrengthSectionResponse {
  status: boolean;
  message: string;
  data: StrengthSection[];
}

export interface StrengthItemsResponse {
  status: boolean;
  message: string;
  data: StrengthItem[];
}

export interface StrengthItemResponse {
  status: boolean;
  message: string;
  data: StrengthItem;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}
