// app/page.tsx
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Container, Typography, Button, Grid, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('language') || 'es');
  }, [i18n]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Select value={i18n.language} onChange={handleLanguageChange} style={{ marginBottom: '1rem' }}>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
      <Typography variant="h2" gutterBottom>
        {t('welcome')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('explore')}
      </Typography>
      {/* Botones de navegación */}
    </Container>
  );
}
