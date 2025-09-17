import { useState, useEffect, useCallback } from 'react';
import { DashboardData, Alert } from '@/types';
import { fetchDashboardData, acknowledgeAlert, getPollInterval } from '@/services/api';

/**
 * Custom hook for managing dashboard data and real-time updates
 */
export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  /**
   * Fetch fresh data from API
   */
  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Acknowledge an alert
   */
  const handleAcknowledgeAlert = useCallback(async (alertId: string) => {
    const success = await acknowledgeAlert(alertId);
    
    if (success && data) {
      // Update local state to reflect acknowledgment
      setData(prevData => {
        if (!prevData) return prevData;
        
        return {
          ...prevData,
          alerts: prevData.alerts.map(alert =>
            alert.id === alertId ? { ...alert, acknowledged: true } : alert
          )
        };
      });
    }
    
    return success;
  }, [data]);

  /**
   * Set up polling for real-time updates
   */
  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling interval
    const interval = setInterval(fetchData, getPollInterval());

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refetch: fetchData,
    acknowledgeAlert: handleAcknowledgeAlert
  };
}
