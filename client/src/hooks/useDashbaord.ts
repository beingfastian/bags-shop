import { getDashboardData } from "@/services/api/DashboardService";
import { DashboardParams } from "@/types/Dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = (params: DashboardParams) => {
    return useQuery({
      queryKey: ['dashboard', params],
      queryFn: () => getDashboardData(params),
    
      // enabled: !!params.startDate && !!params.endDate, // Only fetch when dates are provided
    });
  };