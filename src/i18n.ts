// i18n.ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
            allowMultiLoading: false,
            crossDomain: false,
        },
        load: 'languageOnly',
        defaultNS: 'lesson01',
        react: {
            useSuspense: false
        }
    });

export default i18n;
