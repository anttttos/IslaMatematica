// hooks/useTranslationClient.js
"use client";
import i18n from '../i18n';
import { useEffect, useState } from 'react';

export function useTranslationClient() {
  const [language, setLanguage] = useState(i18n.language);
  const [t, setT] = useState(() => (key) => i18n.t(key));

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setLanguage(lng);
    setT(() => (key) => i18n.t(key));
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'es';
    changeLanguage(storedLanguage);
  }, []);

  return { t, language, changeLanguage };
}
