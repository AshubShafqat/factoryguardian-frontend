import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { formatTimestamp, getRiskStatus } from '@/lib/utils';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => Promise<boolean>;
  loading?: boolean;
}

/**
 * Alert panel component displaying the last 5 alerts with acknowledgment functionality
 */
export function AlertPanel({ alerts, onAcknowledge, loading = false }: AlertPanelProps) {
  const { t, isRTL } = useTranslation();

  const handleAcknowledge = async (alertId: string) => {
    await onAcknowledge(alertId);
  };

  const getSeverityVariant = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {t('alerts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          {t('alerts')}
          {alerts.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {alerts.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-status-green" />
            <p className="text-lg font-medium">{t('noAlerts')}</p>
            <p className="text-sm">{t('allSystemsOperational')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const { status, color } = getRiskStatus(alert.riskScore);
              
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.acknowledged 
                      ? 'bg-muted/50 border-muted' 
                      : color === 'red' 
                        ? 'bg-red-50 border-status-red' 
                        : color === 'yellow'
                          ? 'bg-yellow-50 border-status-yellow'
                          : 'bg-green-50 border-status-green'
                  } transition-colors duration-200`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getSeverityVariant(alert.severity)}>
                          {t(`${alert.severity}Risk`)}
                        </Badge>
                        {!alert.acknowledged && (
                          <Badge variant="outline" className="text-xs">
                            {t('newAlert')}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm font-medium text-foreground mb-2">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Risk: {alert.riskScore}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {alert.acknowledged ? (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3" />
                          <span>{t('acknowledged')}</span>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAcknowledge(alert.id)}
                          className="text-xs"
                        >
                          {t('acknowledge')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
