'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useClients = (search = '') => {
  const queryClient = useQueryClient();

  // Fetch clients
  const { data, isLoading } = useQuery({
    queryKey: ['clients', search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      const response = await axios.get(`/api/clients?${params}`);
      return response.data;
    },
  });

  // Create client
  const createClient = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post('/api/clients', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create client');
    },
  });

  // Update client
  const updateClient = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await axios.put(`/api/clients/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update client');
    },
  });

  // Delete client
  const deleteClient = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/clients/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete client');
    },
  });

  return {
    clients: data?.clients || [],
    isLoading,
    createClient,
    updateClient,
    deleteClient,
  };
};