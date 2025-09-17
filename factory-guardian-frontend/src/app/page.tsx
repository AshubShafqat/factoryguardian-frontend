'use client';

import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MachineGrid } from '@/components/MachineGrid';
import { AlertPanel } from '@/components/AlertPanel';
import { useDashboard } from '@/hooks/useDashboard';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * Main dashboard page component
 * Displays real-time factory monitoring data with multilingual support
 */
export default function DashboardPage() {
  const { data, loading, error, lastUpdate, refetch, acknowledgeAlert } = useDashboard();
  const { isRTL } = useTranslation();

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <DashboardHeader 
        lastUpdate={lastUpdate}
        onRefresh={refetch}
        loading={loading}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive font-medium">
              Error loading data: {error}
            </p>
            <p className="text-sm text-destructive/80 mt-1">
              Using mock data for demonstration purposes.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Machine Status Grid - Takes up 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <MachineGrid 
              machines={data?.machines || []} 
              loading={loading}
            />
          </div>

          {/* Alert Panel - Takes up 1/3 of the width on large screens */}
          <div className="lg:col-span-1">
            <AlertPanel 
              alerts={data?.alerts || []}
              onAcknowledge={acknowledgeAlert}
              loading={loading}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© 2024 FactoryGuardian</span>
              <span>•</span>
              <span>Industrial Safety Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Real-time monitoring</span>
              <span>•</span>
              <span>Multilingual support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
