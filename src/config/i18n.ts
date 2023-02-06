import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../translations/en';
import krTranslations from '../translations/kr';

const resources = {
  en: {
    translation: enTranslations,
  },
  kr: {
    translation: krTranslations,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'kr',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
