// pages/game/division.js
import { Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function DivisionChallenge() {
  const router = useRouter();

  return (
    <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4">Desafío de División</Typography>
      <Typography variant="body1" style={{ margin: '1rem 0' }}>
        Resuelve ejercicios de división para avanzar en el juego.
      </Typography>
      {/* Aquí irían los componentes interactivos para el desafío de división */}
      <Button variant="contained" color="primary" onClick={() => router.push('/game')}>
        Volver a la isla
      </Button>
    </Container>
  );
}
