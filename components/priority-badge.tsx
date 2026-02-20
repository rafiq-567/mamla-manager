import { Badge } from '@/components/ui/badge';
import { AlertCircle, Minus, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = {
    High: {
      icon: AlertCircle,
      className: 'bg-red-100 text-red-800 hover:bg-red-100',
    },
    Medium: {
      icon: Minus,
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    },
    Low: {
      icon: ArrowDown,
      className: 'bg-green-100 text-green-800 hover:bg-green-100',
    },
  };

  const { icon: Icon, className } = config[priority as keyof typeof config] || config.Medium;

  return (
    <Badge className={`${className} flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {priority}
    </Badge>
  );
}