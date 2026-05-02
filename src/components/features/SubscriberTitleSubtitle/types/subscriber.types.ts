// src/components/features/SubscriberTitleSubtitle/types/subscriber.types.ts

export interface SubscriberTitle {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubscriberTitleResponse {
  status: boolean;
  message: string;
  data: SubscriberTitle[];
}

export interface SingleSubscriberTitleResponse {
  status: boolean;
  message: string;
  data: SubscriberTitle;
}

export interface CreateSubscriberTitleDTO {
  title: string;
  subTitle: string;
}
