import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrafficLight } from '@/components/TrafficLight';
import { Machine } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { formatTimestamp } from '@/lib/utils';
import { MapPin, Clock, Activity } from 'lucide-react';

interface MachineCardProps {
  machine: Machine;
}

/**
 * Machine card component displaying machine status and risk information
 */
export function MachineCard({ machine }: MachineCardProps) {
  const { t, isRTL } = useTranslation();
  
  const getStatusVariant = (status: Machine['status']) => {
    switch (status) {
      case 'operational':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'offline':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {machine.name}
            </CardTitle>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{machine.location}</span>
            </div>
          </div>
          <TrafficLight 
            riskScore={machine.riskScore} 
            size="md" 
            animated={machine.riskScore > 70}
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {t('operational')}
            </span>
            <Badge variant={getStatusVariant(machine.status)}>
              {t(machine.status)}
            </Badge>
          </div>

          {/* Risk Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {t('riskScore')}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                {machine.riskScore}
              </span>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatTimestamp(machine.lastUpdated)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
