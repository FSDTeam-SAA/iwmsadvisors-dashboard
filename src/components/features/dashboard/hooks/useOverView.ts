import { useQuery } from "@tanstack/react-query";
import { OverviewResponse } from "../types/overview.types";
import { getOverviewApi } from "../api/overview.api";

export const useOverview = (year: string = "2026") => {
  return useQuery<OverviewResponse>({
    queryKey: ["overview", year],
    queryFn: () => getOverviewApi(year),
  });
};
