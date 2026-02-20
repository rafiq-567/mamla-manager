'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CaseStatusBadge } from './case-status-badge';
import { PriorityBadge } from './priority-badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface CaseCardProps {
  case: any;
  onEdit?: (caseData: any) => void;
  onDelete?: (id: string) => void;
}

export function CaseCard({ case: caseData, onEdit, onDelete }: CaseCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{caseData.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Case #{caseData.caseNumber}
            </p>
          </div>
          <div className="flex gap-2">
            <CaseStatusBadge status={caseData.status} />
            <PriorityBadge priority={caseData.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Client:</span>
            <span className="font-medium">{caseData.client.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Filed:</span>
            <span>{format(new Date(caseData.filingDate), 'MMM dd, yyyy')}</span>
          </div>

          {caseData.nextHearingDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span className="text-muted-foreground">Next Hearing:</span>
              <span className="font-medium text-orange-600">
                {format(new Date(caseData.nextHearingDate), 'MMM dd, yyyy')}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-muted rounded text-xs">
              {caseData.caseType}
            </span>
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t">
            <Link href={`/dashboard/cases/${caseData._id}`} className="flex-1">
              <Button variant="outline" className="w-full" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(caseData)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(caseData._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}