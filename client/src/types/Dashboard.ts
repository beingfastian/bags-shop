export interface DailyRevenue {
  date: string;
  totalAmount: number;
}

interface visitor {
  count: number;
}

export interface DashboardData {
  uniqueVisitors: visitor;
  allVisitors: visitor;
  FirstTimeVisitors: visitor;
  allUsers: visitor;
  totalRevenue: number;
  dailyRevenue: number;
  revenuePeriod: DailyRevenue[];
}

export interface DashboardParams {
  startDate?: string;
  endDate?: string;
}

export interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
