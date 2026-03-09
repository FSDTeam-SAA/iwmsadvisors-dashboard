// src/components/features/statsSection/types/statsSection.type.ts

export interface StatsSectionItem {
  order: number;
  value: string;
  title: string;
  description: string;
}

export interface StatsSection {
  _id: string;
  title: string;
  subtitle: string;
  items: StatsSectionItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StatsSectionResponse {
  status: boolean;
  message: string;
  data: StatsSection[];
}

export interface CreateStatsSectionPayload {
  title: string;
  subtitle: string;
  items: Omit<StatsSectionItem, "order">[]; // Usually order is handled by the backend or UI but let's see. If the UI needs to send it, we include it.
}

export interface StatsSectionFormData {
  title: string;
  subtitle: string;
  items: StatsSectionItem[];
}
