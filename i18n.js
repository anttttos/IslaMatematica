// i18n.js
import i18n from 'i18next';

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

// Inicializa `i18next` solo en el cliente
if (typeof window !== 'undefined' && !i18n.isInitialized) {
  i18n.init({
    resources,
    lng: localStorage.getItem('language') || 'es', // Idioma predeterminado
    interpolation: { escapeValue: false },
    fallbackLng: 'es',
  });
}

export default i18n;
