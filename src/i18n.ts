import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const baseUrl = import.meta.env.PUBLIC_URL || '';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: `${baseUrl}/locales/{{lng}}/{{ns}}.json`,
        },
        load: 'languageOnly',
        defaultNS: 'lesson01',
        react: {
            useSuspense: false
        }
    });


export default i18n;
