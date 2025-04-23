import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/lib/i18n';

export function useLanguage() {
  const { i18n } = useTranslation();
  
  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    changeLanguage(newLang as 'en' | 'ar');
  }, [i18n.language]);
  
  return {
    currentLanguage: i18n.language,
    isRTL: i18n.language === 'ar',
    toggleLanguage
  };
}
