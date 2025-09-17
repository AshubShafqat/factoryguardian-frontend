import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { Languages } from 'lucide-react';

/**
 * Language toggle component for switching between English and Urdu
 */
export function LanguageToggle() {
  const { locale, changeLanguage, isRTL } = useTranslation();

  const handleLanguageChange = () => {
    const newLocale = locale === 'en' ? 'ur' : 'en';
    changeLanguage(newLocale);
  };

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4" />
      <Toggle
        pressed={locale === 'ur'}
        onPressedChange={handleLanguageChange}
        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        aria-label="Toggle language"
      >
        <span className="text-sm font-medium">
          {locale === 'en' ? 'EN' : 'اردو'}
        </span>
      </Toggle>
    </div>
  );
}
