// app/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { Container, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslationClient } from '../hooks/useTranslationClient';

export default function Home() {
  const { t, language, changeLanguage } = useTranslationClient();
  const [isClient, setIsClient] = useState(false);

  // Esto asegura que el componente solo renderiza en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage); // Guardar idioma en Local Storage
  };

  if (!isClient) {
    return null; // Evitar renderizar en el servidor
  }

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Select
        value={language}
        onChange={handleLanguageChange}
        style={{ marginBottom: '1rem' }}
      >
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
      <Typography variant="h2" gutterBottom>
        {t('welcome')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('explore')}
      </Typography>
    </Container>
  );
}
