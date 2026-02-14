'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  caseType?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const useCases = (filters: CaseFilters = {}) => {
  const queryClient = useQueryClient();

  // Fetch cases
  const { data, isLoading, error } = useQuery({
    queryKey: ['cases', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
      const response = await axios.get(`/api/cases?${params}`);
      return response.data;
    },
  });

  // Create case
  const createCase = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('/api/cases', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Case created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create case');
    },
  });

  // Update case
  const updateCase = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await axios.put(`/api/cases/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Case updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update case');
    },
  });

  // Delete case
  const deleteCase = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/cases/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Case deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete case');
    },
  });

  return {
    cases: data?.cases || [],
    pagination: data?.pagination,
    isLoading,
    error,
    createCase,
    updateCase,
    deleteCase,
  };
};

// Fetch single case
export const useCase = (id: string) => {
  return useQuery({
    queryKey: ['case', id],
    queryFn: async () => {
      const response = await axios.get(`/api/cases/${id}`);
      return response.data.case;
    },
    enabled: !!id,
  });
};