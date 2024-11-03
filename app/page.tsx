// app/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { Container, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslationClient } from '../hooks/useTranslationClient';

export default function Home() {
  const { t, language, changeLanguage } = useTranslationClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
  };

  if (!isClient) {
    return null;
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
        {t('welcome') || 'Bienvenido a Isla Matemática'}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('explore') || 'Explora las zonas de la isla para mejorar tus habilidades matemáticas.'}
      </Typography>
    </Container>
  );
}
