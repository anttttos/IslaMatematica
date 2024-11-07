// app/gamepage.tsx
"use client";
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const GamePage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el nombre de usuario de localStorage para verificar si hay una sesión activa
    const savedUsername = localStorage.getItem('username');
    if (!savedUsername) {
      router.push('/'); // Redirige al inicio si no hay usuario registrado
    } else {
      setUsername(savedUsername);
    }
  }, [router]);

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h2" gutterBottom>
        ¡Bienvenido a tu Zona de Logros, {username}!
      </Typography>
      <Typography variant="body1" paragraph>
        Aquí puedes ver tus logros y progreso en el juego.
      </Typography>
      {/* Ejemplo de logro */}
      <Typography variant="h5">Logros:</Typography>
      <ul>
        <li>Logro 1: Completa la Playa de las Sumas</li>
        <li>Logro 2: Supera la Selva de las Restas</li>
      </ul>
      <Button variant="contained" color="primary" onClick={() => router.push('/game')}>
        Comenzar a Jugar
      </Button>
    </Container>
  );
};

export default GamePage;
