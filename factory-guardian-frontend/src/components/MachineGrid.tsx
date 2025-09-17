import React from 'react';
import { MachineCard } from '@/components/MachineCard';
import { Machine } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface MachineGridProps {
  machines: Machine[];
  loading?: boolean;
}

/**
 * Machine grid component displaying all machines in a responsive grid layout
 */
export function MachineGrid({ machines, loading = false }: MachineGridProps) {
  const { t, isRTL } = useTranslation();

  // Calculate summary statistics
  const totalMachines = machines.length;
  const operationalMachines = machines.filter(m => m.status === 'operational').length;
  const highRiskMachines = machines.filter(m => m.riskScore > 70).length;
  const maintenanceMachines = machines.filter(m => m.status === 'maintenance').length;

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton for summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
        
        {/* Loading skeleton for machine cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Machines */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('machineStatus')}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {totalMachines}
              </p>
            </div>
          </div>
        </div>

        {/* Operational Machines */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-status-green/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-status-green" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('operational')}
              </p>
              <p className="text-2xl font-bold text-status-green">
                {operationalMachines}
              </p>
            </div>
          </div>
        </div>

        {/* High Risk Machines */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-status-red/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-status-red" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('highRisk')}
              </p>
              <p className="text-2xl font-bold text-status-red">
                {highRiskMachines}
              </p>
            </div>
          </div>
        </div>

        {/* Maintenance Machines */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-status-yellow/10 rounded-lg">
              <Clock className="h-5 w-5 text-status-yellow" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('maintenance')}
              </p>
              <p className="text-2xl font-bold text-status-yellow">
                {maintenanceMachines}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Cards Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {t('machineStatus')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      </div>
    </div>
  );
}
