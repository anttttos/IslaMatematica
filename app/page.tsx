'use client';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const router = useRouter();
  const { t } = useTranslation(); // Hook para traducciones dinámicas

  return (
    <div className="container">
      <Typography variant="h2" gutterBottom>{t('welcome')}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/game')}
        style={{ marginBottom: '10px' }}
      >
        {t('play_as_guest')}
      </Button>
      <Button variant="contained" color="secondary" onClick={() => router.push('/auth')}>
        {t('login_or_register')}
      </Button>
    </div>
  );
};

export default HomePage;
