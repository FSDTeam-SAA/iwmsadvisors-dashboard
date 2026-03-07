// src/components/features/missionVision/types/missionVision.type.ts

export interface Vision {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Mission {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface VisionsResponse extends BaseResponse {
  data: Vision[];
}

export interface MissionResponse extends BaseResponse {
  data: Mission[];
}
