import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en';
import arTranslation from '../locales/ar';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Function to change language and document direction
export const changeLanguage = (language: 'en' | 'ar') => {
  i18n.changeLanguage(language);
  document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', language);
};

// Set initial direction
document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
document.documentElement.setAttribute('lang', i18n.language);

export default i18n;
