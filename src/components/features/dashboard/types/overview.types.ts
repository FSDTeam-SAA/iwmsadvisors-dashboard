export interface ServiceStats {
  counts: Record<string, number>;
  percentages: Record<string, number>;
  total: number;
}

export interface YearlyData {
  [month: string]: ServiceStats;
}

export interface OverviewData {
  [year: string]: YearlyData;
}

export interface OverviewResponse {
  success: boolean;
  message: string;
  data: OverviewData;
}
