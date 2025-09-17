import React from 'react';
import { getRiskStatus, getRiskAnimation } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TrafficLightProps {
  riskScore: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

/**
 * Traffic light component for displaying risk status
 * Shows green, yellow, or red based on risk score thresholds
 */
export function TrafficLight({ 
  riskScore, 
  size = 'md', 
  animated = true, 
  className 
}: TrafficLightProps) {
  const { status, color, className: statusClassName } = getRiskStatus(riskScore);
  const animationClass = animated ? getRiskAnimation(color) : '';

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div
      className={cn(
        'rounded-full border-2 border-white shadow-lg',
        sizeClasses[size],
        statusClassName,
        animationClass,
        className
      )}
      title={`Risk Score: ${riskScore} (${status})`}
      role="status"
      aria-label={`Risk level: ${status}`}
    />
  );
}
