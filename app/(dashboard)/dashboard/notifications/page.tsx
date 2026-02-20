'use client';

import { useNotifications } from '@/hooks/useNotifications';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const { notifications, isLoading, markAsRead, markAllAsRead } = useNotifications();

  if (isLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your case activities
          </p>
        </div>
        {notifications.length > 0 && (
          <Button
            variant="outline"
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-16 w-16" />}
          title="No notifications"
          description="You're all caught up! No new notifications at the moment."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification: any) => (
            <Card
              key={notification._id}
              className={cn(
                'transition-all hover:shadow-md cursor-pointer',
                !notification.read && 'border-l-4 border-l-primary bg-primary/5'
              )}
              onClick={() => !notification.read && markAsRead.mutate(notification._id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0',
                      notification.read ? 'bg-muted' : 'bg-primary/10'
                    )}
                  >
                    {notification.read ? (
                      <Check className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Bell className="h-5 w-5 text-primary" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        {notification.relatedCase && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Case #{notification.relatedCase.caseNumber}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(notification.createdAt), 'MMM dd, h:mm a')}
                        </p>
                        {!notification.read && (
                          <Badge variant="default" className="mt-1">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="text-xs">
                        {notification.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}