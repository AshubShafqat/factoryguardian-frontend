/**
 * Core data types for FactoryGuardian dashboard
 */

export interface Machine {
  id: string;
  name: string;
  location: string;
  riskScore: number;
  lastUpdated: string;
  status: 'operational' | 'maintenance' | 'offline';
}

export interface Alert {
  id: string;
  message: string;
  riskScore: number;
  timestamp: string;
  machineId: string;
  severity: 'low' | 'medium' | 'high';
  acknowledged: boolean;
}

export interface DashboardData {
  machines: Machine[];
  alerts: Alert[];
  lastUpdated: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export type RiskStatus = 'low' | 'medium' | 'high';
export type RiskColor = 'green' | 'yellow' | 'red';

export interface RiskStatusInfo {
  status: RiskStatus;
  color: RiskColor;
  className: string;
}
