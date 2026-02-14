'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/dashboard/stats');
      return response.data;
    },
  });
};