import { DashboardData, Machine, Alert, ApiResponse } from '@/types';

/**
 * API service for FactoryGuardian dashboard
 * Handles communication with backend APIs and provides mock data fallback
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
const POLL_INTERVAL = parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL || '5000');

/**
 * Mock data for development and fallback
 */
const mockMachines: Machine[] = [
  {
    id: 'machine-001',
    name: 'Conveyor Belt A',
    location: 'Production Floor 1',
    riskScore: 25,
    lastUpdated: new Date().toISOString(),
    status: 'operational'
  },
  {
    id: 'machine-002',
    name: 'Hydraulic Press B',
    location: 'Production Floor 1',
    riskScore: 45,
    lastUpdated: new Date().toISOString(),
    status: 'operational'
  },
  {
    id: 'machine-003',
    name: 'Welding Station C',
    location: 'Production Floor 2',
    riskScore: 75,
    lastUpdated: new Date().toISOString(),
    status: 'operational'
  },
  {
    id: 'machine-004',
    name: 'Assembly Line D',
    location: 'Production Floor 2',
    riskScore: 15,
    lastUpdated: new Date().toISOString(),
    status: 'operational'
  },
  {
    id: 'machine-005',
    name: 'Quality Control E',
    location: 'Production Floor 3',
    riskScore: 85,
    lastUpdated: new Date().toISOString(),
    status: 'operational'
  },
  {
    id: 'machine-006',
    name: 'Packaging Unit F',
    location: 'Production Floor 3',
    riskScore: 35,
    lastUpdated: new Date().toISOString(),
    status: 'maintenance'
  }
];

const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    message: 'High temperature detected in Welding Station C',
    riskScore: 75,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    machineId: 'machine-003',
    severity: 'high',
    acknowledged: false
  },
  {
    id: 'alert-002',
    message: 'Vibration levels elevated in Hydraulic Press B',
    riskScore: 45,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    machineId: 'machine-002',
    severity: 'medium',
    acknowledged: false
  },
  {
    id: 'alert-003',
    message: 'Maintenance required for Packaging Unit F',
    riskScore: 35,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    machineId: 'machine-006',
    severity: 'medium',
    acknowledged: true
  },
  {
    id: 'alert-004',
    message: 'Safety system check completed for Conveyor Belt A',
    riskScore: 25,
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    machineId: 'machine-001',
    severity: 'low',
    acknowledged: true
  },
  {
    id: 'alert-005',
    message: 'Critical failure risk in Quality Control E',
    riskScore: 85,
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    machineId: 'machine-005',
    severity: 'high',
    acknowledged: false
  }
];

/**
 * Generate random variations in mock data to simulate real-time updates
 */
function generateRandomVariation(baseValue: number, maxVariation: number = 10): number {
  const variation = (Math.random() - 0.5) * 2 * maxVariation;
  return Math.max(0, Math.min(100, Math.round(baseValue + variation)));
}

/**
 * Fetch dashboard data from API with fallback to mock data
 */
export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add API key if available
        ...(process.env.NEXT_PUBLIC_API_KEY && {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        })
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: ApiResponse<DashboardData> = await response.json();
    return data.data;
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    
    // Return mock data with slight variations to simulate real-time updates
    const updatedMachines = mockMachines.map(machine => ({
      ...machine,
      riskScore: generateRandomVariation(machine.riskScore),
      lastUpdated: new Date().toISOString()
    }));

    const updatedAlerts = mockAlerts.map(alert => ({
      ...alert,
      riskScore: generateRandomVariation(alert.riskScore, 5)
    }));

    return {
      machines: updatedMachines,
      alerts: updatedAlerts.slice(0, 5), // Return only last 5 alerts
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Acknowledge an alert
 */
export async function acknowledgeAlert(alertId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/alerts/${alertId}/acknowledge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.NEXT_PUBLIC_API_KEY && {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        })
      },
      signal: AbortSignal.timeout(5000)
    });

    return response.ok;
  } catch (error) {
    console.warn('Failed to acknowledge alert:', error);
    return false;
  }
}

/**
 * Get polling interval in milliseconds
 */
export function getPollInterval(): number {
  return POLL_INTERVAL;
}

/**
 * Check if API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
