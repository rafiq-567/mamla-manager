import { Badge } from '@/components/ui/badge';

interface CaseStatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  'Filed': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  'In Progress': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  'Pending': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  'Won': 'bg-green-100 text-green-800 hover:bg-green-100',
  'Lost': 'bg-red-100 text-red-800 hover:bg-red-100',
  'Settled': 'bg-purple-100 text-purple-800 hover:bg-purple-100',
};

export function CaseStatusBadge({ status }: CaseStatusBadgeProps) {
  return (
    <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
      {status}
    </Badge>
  );
}