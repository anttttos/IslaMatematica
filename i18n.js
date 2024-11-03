// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Math Island',
      explore: 'Explore the zones of the island to improve your math skills.',
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido a Isla Matemática',
      explore: 'Explora las zonas de la isla para mejorar tus habilidades matemáticas.',
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'es', // Set default language from Local Storage
  interpolation: { escapeValue: false }
});

export default i18n;
