// app/page.tsx
'use client';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="container">
      <Typography variant="h2" gutterBottom>Bienvenido a la Isla Matemática</Typography>
      <Button variant="contained" color="primary" onClick={() => router.push('/game')}>
        Jugar como Invitado
      </Button>
      <Button variant="contained" color="secondary" onClick={() => router.push('/auth')}>
        Iniciar Sesión o Registrarse
      </Button>
    </div>
  );
};

export default HomePage;
