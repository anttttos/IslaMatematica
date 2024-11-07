// pages/game/index.js
import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function GameHome() {
  const router = useRouter();

  return (
    <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Bienvenido a los Desafíos Matemáticos</Typography>
      <Typography variant="subtitle1" gutterBottom>Selecciona un desafío para comenzar:</Typography>
      <Button variant="contained" color="primary" onClick={() => router.push('/game/Sumas')} style={{ margin: '10px' }}>
        Playa de las Sumas
      </Button>
      <Button variant="contained" color="secondary" onClick={() => router.push('/game/Restas')} style={{ margin: '10px' }}>
        Selva de las Restas
      </Button>
      <Button variant="contained" color="primary" onClick={() => router.push('/game/Multiplicacion')} style={{ margin: '10px' }}>
        Montañas de la Multiplicación
      </Button>
      <Button variant="contained" color="secondary" onClick={() => router.push('/game/division')} style={{ margin: '10px' }}>
        Valle de la División
      </Button>
    </Container>
  );
}
