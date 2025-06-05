import axios from '@/lib/axios';
import { DashboardData, DashboardParams } from '@/types/Dashboard';
export const getDashboardData = async (
  params: DashboardParams
): Promise<DashboardData> => {
  try {
    console.log('Dashobard called');
    const { startDate, endDate } = params;
    const response = await axios.get<DashboardData>(`/admin/dashboard`, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
