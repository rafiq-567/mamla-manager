'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useNotifications = (unreadOnly = false) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications', unreadOnly],
    queryFn: async () => {
      const response = await axios.get(`/api/notifications?unreadOnly=${unreadOnly}`);
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.patch(`/api/notifications/${id}/read`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const response = await axios.patch('/api/notifications/mark-all-read');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    notifications: data?.notifications || [],
    unreadCount: data?.unreadCount || 0,
    isLoading,
    markAsRead,
    markAllAsRead,
  };
};