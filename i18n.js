import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Math Island',
      play_as_guest: 'Play as Guest',
      login_or_register: 'Login or Register',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a Isla Matemática',
      play_as_guest: 'Jugar como Invitado',
      login_or_register: 'Iniciar Sesión o Registrarse',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'es' : 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

export default i18n;
