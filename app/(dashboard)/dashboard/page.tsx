'use client';

import { StatCard } from '@/components/stat-card';
import { CaseCard } from '@/components/case-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/hooks/useDashboard';
import { useCases } from '@/hooks/useCases';
import { LoadingSpinner } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Briefcase,
  TrendingUp,
  Calendar,
  CheckCircle,
  Plus,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboard();
  const { cases, isLoading: casesLoading } = useCases({ limit: 6, sortBy: 'updatedAt' });

  if (statsLoading) {
    return <LoadingSpinner className="min-h-[400px]" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your cases.
          </p>
        </div>
        <Link href="/dashboard/cases/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Cases"
          value={stats?.totalCases || 0}
          icon={Briefcase}
          description="All time"
        />
        <StatCard
          title="Active Cases"
          value={stats?.activeCases || 0}
          icon={TrendingUp}
          description="Currently in progress"
        />
        <StatCard
          title="Upcoming Hearings"
          value={stats?.upcomingHearings?.length || 0}
          icon={Calendar}
          description="Next 7 days"
        />
        <StatCard
          title="Cases Won"
          value={
            stats?.outcomes?.find((o: any) => o._id === 'Won')?.count || 0
          }
          icon={CheckCircle}
          description="Total victories"
        />
      </div>

      {/* Upcoming Hearings */}
      {stats?.upcomingHearings && stats.upcomingHearings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Hearings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.upcomingHearings.map((hearing: any) => (
                <div
                  key={hearing._id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{hearing.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Case #{hearing.caseNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600">
                      {format(new Date(hearing.nextHearingDate), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(hearing.nextHearingDate), 'EEEE')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Cases */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Cases</h2>
          <Link href="/dashboard/cases">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {casesLoading ? (
          <LoadingSpinner className="min-h-[200px]" />
        ) : cases.length === 0 ? (
          <EmptyState
            title="No cases yet"
            description="Start by creating your first case"
            action={{
              label: 'Create Case',
              onClick: () => (window.location.href = '/dashboard/cases/new'),
            }}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem: any) => (
              <CaseCard key={caseItem._id} case={caseItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}