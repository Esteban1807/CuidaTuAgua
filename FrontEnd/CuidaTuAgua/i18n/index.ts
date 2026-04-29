// src/i18n/index.ts
import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initReactI18next } from 'react-i18next';

import enLanding from './translations/en/landing.json';
import esLanding from './translations/es/landing.json';
import frLanding from './translations/fr/landing.json';
import ptLanding from './translations/pt/landing.json';

const LANGUAGE_KEY = 'appLang';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        landing: enLanding 
      },

      es: { 
        landing: esLanding 
      },
      fr: { 
        landing: frLanding 
      },
      
      pt: { 
        landing: ptLanding
      }
    },
    lng: 'es',
    fallbackLng: 'en',
    ns: ['landing', 'home'], 
    defaultNS: 'landing',
    interpolation: {
      escapeValue: false
    }
  });

  // cargar idioma guardado
AsyncStorage.getItem(LANGUAGE_KEY).then(lang => {
  if (lang) i18n.changeLanguage(lang);
});

// guardar cuando cambie
i18n.on('languageChanged', lang => {
  AsyncStorage.setItem(LANGUAGE_KEY, lang);
});

export default i18n;