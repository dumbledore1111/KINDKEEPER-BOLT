import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface OverviewCardProps {
  title: string;
  amount: number;
  trend?: string;
  isPositive?: boolean;
  icon: LucideIcon;
}

export function OverviewCard({ 
  title, 
  amount, 
  trend, 
  isPositive = true, 
  icon: Icon 
}: OverviewCardProps) {
  return (
    <Card variant="dark" className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl ${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <Icon className={`w-6 h-6 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
        </div>
        <h3 className="text-xl font-medium text-white">{title}</h3>
      </div>
      <div>
        <p className="text-3xl font-bold text-white mb-2">₹{amount.toFixed(2)}</p>
        {trend && (
          <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend} from last month
          </p>
        )}
      </div>
    </Card>
  );
}