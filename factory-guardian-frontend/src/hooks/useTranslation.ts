import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Translation keys for the application
 */
export interface Translations {
  // Navigation and general
  dashboard: string;
  factoryGuardian: string;
  language: string;
  
  // Dashboard sections
  machineStatus: string;
  alerts: string;
  lastUpdated: string;
  
  // Machine status
  operational: string;
  maintenance: string;
  offline: string;
  riskScore: string;
  location: string;
  
  // Risk levels
  lowRisk: string;
  mediumRisk: string;
  highRisk: string;
  
  // Alerts
  noAlerts: string;
  acknowledge: string;
  acknowledged: string;
  newAlert: string;
  
  // Status indicators
  allSystemsOperational: string;
  attentionRequired: string;
  criticalAlert: string;
  
  // Actions
  refresh: string;
  viewDetails: string;
  
  // Time
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
}

/**
 * English translations
 */
const englishTranslations: Translations = {
  dashboard: 'Dashboard',
  factoryGuardian: 'Factory Guardian',
  language: 'Language',
  
  machineStatus: 'Machine Status',
  alerts: 'Alerts',
  lastUpdated: 'Last Updated',
  
  operational: 'Operational',
  maintenance: 'Maintenance',
  offline: 'Offline',
  riskScore: 'Risk Score',
  location: 'Location',
  
  lowRisk: 'Low Risk',
  mediumRisk: 'Medium Risk',
  highRisk: 'High Risk',
  
  noAlerts: 'No alerts at this time',
  acknowledge: 'Acknowledge',
  acknowledged: 'Acknowledged',
  newAlert: 'New Alert',
  
  allSystemsOperational: 'All Systems Operational',
  attentionRequired: 'Attention Required',
  criticalAlert: 'Critical Alert',
  
  refresh: 'Refresh',
  viewDetails: 'View Details',
  
  justNow: 'Just now',
  minutesAgo: 'minutes ago',
  hoursAgo: 'hours ago',
};

/**
 * Urdu translations
 */
const urduTranslations: Translations = {
  dashboard: 'ڈیش بورڈ',
  factoryGuardian: 'فیکٹری گارڈین',
  language: 'زبان',
  
  machineStatus: 'مشین کی حالت',
  alerts: 'الرٹس',
  lastUpdated: 'آخری اپڈیٹ',
  
  operational: 'فعال',
  maintenance: 'دیکھ بھال',
  offline: 'آف لائن',
  riskScore: 'خطرے کا اسکور',
  location: 'مقام',
  
  lowRisk: 'کم خطرہ',
  mediumRisk: 'درمیانی خطرہ',
  highRisk: 'زیادہ خطرہ',
  
  noAlerts: 'فی الوقت کوئی الرٹ نہیں',
  acknowledge: 'تسلیم کریں',
  acknowledged: 'تسلیم شدہ',
  newAlert: 'نیا الرٹ',
  
  allSystemsOperational: 'تمام سسٹم فعال ہیں',
  attentionRequired: 'توجہ درکار',
  criticalAlert: 'اہم الرٹ',
  
  refresh: 'ریفریش',
  viewDetails: 'تفصیلات دیکھیں',
  
  justNow: 'ابھی ابھی',
  minutesAgo: 'منٹ پہلے',
  hoursAgo: 'گھنٹے پہلے',
};

/**
 * Custom hook for translations
 */
export function useTranslation() {
  const router = useRouter();
  const [translations, setTranslations] = useState<Translations>(englishTranslations);

  useEffect(() => {
    const locale = router.locale || 'en';
    setTranslations(locale === 'ur' ? urduTranslations : englishTranslations);
  }, [router.locale]);

  const t = (key: keyof Translations): string => {
    return translations[key] || key;
  };

  const changeLanguage = (locale: 'en' | 'ur') => {
    router.push(router.asPath, router.asPath, { locale });
  };

  return {
    t,
    locale: router.locale || 'en',
    changeLanguage,
    isRTL: router.locale === 'ur'
  };
}
