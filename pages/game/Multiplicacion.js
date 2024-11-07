// pages/game/multiplicacion.js
import { Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function MultiplicacionChallenge() {
  const router = useRouter();

  return (
    <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4">Montañas de las Multiplicaciones</Typography>
      <Typography variant="body1" style={{ margin: '1rem 0' }}>
        Resuelve ejercicios de multiplicación para avanzar en el juego.
      </Typography>
      {/* Aquí irían los componentes interactivos para el desafío de multiplicación */}
      <Button variant="contained" color="primary" onClick={() => router.push('/game')}>
        Volver a la isla
      </Button>
    </Container>
  );
}
