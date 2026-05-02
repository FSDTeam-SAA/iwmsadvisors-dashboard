// src/components/features/InsightsTitleSubtitle/types/insight.types.ts

export interface Insight {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface InsightResponse {
  status: boolean;
  message: string;
  data: Insight[];
}

export interface SingleInsightResponse {
  status: boolean;
  message: string;
  data: Insight;
}

export interface CreateInsightDTO {
  title: string;
  subTitle: string;
}
