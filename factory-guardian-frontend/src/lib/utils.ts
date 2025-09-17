import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get risk status based on score
 * @param score Risk score (0-100)
 * @returns Risk status and color
 */
export function getRiskStatus(score: number): {
  status: 'low' | 'medium' | 'high';
  color: 'green' | 'yellow' | 'red';
  className: string;
} {
  if (score <= 30) {
    return {
      status: 'low',
      color: 'green',
      className: 'bg-status-green text-white'
    }
  } else if (score <= 70) {
    return {
      status: 'medium',
      color: 'yellow',
      className: 'bg-status-yellow text-black'
    }
  } else {
    return {
      status: 'high',
      color: 'red',
      className: 'bg-status-red text-white'
    }
  }
}

/**
 * Format timestamp for display
 * @param timestamp ISO timestamp
 * @returns Formatted time string
 */
export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString()
}

/**
 * Get animation class for risk status
 * @param color Risk color
 * @returns Animation class name
 */
export function getRiskAnimation(color: 'green' | 'yellow' | 'red'): string {
  switch (color) {
    case 'green':
      return 'animate-pulse-green'
    case 'yellow':
      return 'animate-pulse-yellow'
    case 'red':
      return 'animate-pulse-red'
    default:
      return ''
  }
}
