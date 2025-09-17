import React from 'react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { RefreshCw, Shield } from 'lucide-react';

interface DashboardHeaderProps {
  lastUpdate?: Date | null;
  onRefresh?: () => void;
  loading?: boolean;
}

/**
 * Dashboard header component with title, language toggle, and refresh functionality
 */
export function DashboardHeader({ lastUpdate, onRefresh, loading = false }: DashboardHeaderProps) {
  const { t, isRTL } = useTranslation();

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 1) {
      return t('justNow');
    } else if (diffMins < 60) {
      return `${diffMins} ${t('minutesAgo')}`;
    } else {
      return `${diffHours} ${t('hoursAgo')}`;
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('factoryGuardian')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('dashboard')}
              </p>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Last update info */}
            {lastUpdate && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span>{t('lastUpdated')}:</span>
                <span className="font-medium">
                  {formatLastUpdate(lastUpdate)}
                </span>
              </div>
            )}

            {/* Refresh button */}
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{t('refresh')}</span>
              </Button>
            )}

            {/* Language toggle */}
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
