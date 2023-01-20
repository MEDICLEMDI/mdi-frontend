import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enLocale from "./locales/enLocale.json";
import krLocale from "./locales/krLocale.json";

const resources = {
    en: enLocale,
    kr: krLocale,
}

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'kr',
    // debug: true,
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
})

export default i18n;
