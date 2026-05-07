// src/i18n/index.ts
import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';

import enLanding from './translations/en/landing.json';
import esLanding from './translations/es/landing.json';
import frLanding from './translations/fr/landing.json';
import ptLanding from './translations/pt/landing.json';

import enLogin from './translations/en/login.json';
import esLogin from './translations/es/login.json';
import frLogin from './translations/fr/login.json';
import ptLogin from './translations/pt/login.json';

import enDashboard from './translations/en/dashboard.json';
import esDashboard from './translations/es/dashboard.json';
import frDashboard from './translations/fr/dashboard.json';
import ptDashboard from './translations/pt/dashboard.json';

import enSettings from './translations/en/settings.json';
import esSettings from './translations/es/settings.json';
import frSettings from './translations/fr/settings.json';
import ptSettings from './translations/pt/settings.json';

import enProfile from './translations/en/profile.json';
import esProfile from './translations/es/profile.json';
import frProfile from './translations/fr/profile.json';
import ptProfile from './translations/pt/profile.json';

import enResults from './translations/en/results.json';
import esResults from './translations/es/results.json';
import frResults from './translations/fr/results.json';
import ptResults from './translations/pt/results.json';

const LANGUAGE_KEY = 'appLang';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { 
        landing: esLanding,
        login: esLogin,
        dashboard: esDashboard,
        settings: esSettings,
        profile: esProfile,
        results: esResults
      },
      fr: { 
        landing: frLanding,
        login: frLogin,
        dashboard: frDashboard,
        settings: frSettings,
        profile: frProfile,
        results: frResults
      },
      
      pt: { 
        landing: ptLanding,
        login: ptLogin,
        dashboard: ptDashboard,
        settings: ptSettings,
        profile: ptProfile,
        results: ptResults
      },
      en: {
        landing: enLanding,
        login: enLogin,
        dashboard: enDashboard,
        settings: enSettings,
        profile: enProfile,
        results: enResults
      }
    },
    lng: 'es',
    fallbackLng: 'en',
    ns: ['landing', 'login', 'dashboard', 'settings', 'profile', 'results'], 
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