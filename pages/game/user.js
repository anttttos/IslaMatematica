// pages/game/user.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';

export default function UserGame() {
  const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario ha iniciado sesión
    const isLoggedIn = localStorage.getItem('username'); // Reemplaza con tu lógica de autenticación real
    if (!isLoggedIn) {
      router.push('/auth'); // Redirige a autenticación si no está logueado
    }
  }, [router]); // Agrega router al array de dependencias

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4">Juego para Usuarios Registrados</Typography>
      {/* Aquí puedes mostrar los logros o preferencias del usuario */}
    </Container>
  );
}
