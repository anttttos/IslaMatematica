// app/page.tsx
import { Container, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h2" gutterBottom>
        Bienvenido a Isla Matemática
      </Typography>
      <Typography variant="body1" paragraph>
        Explora las zonas de la isla para mejorar tus habilidades matemáticas.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link href="/sumas" passHref>
            <Button variant="contained" color="primary">Playa de las Sumas</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/restas" passHref>
            <Button variant="contained" color="secondary">Selva de las Restas</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/multiplicacion" passHref>
            <Button variant="contained" color="success">Montañas de la Multiplicación</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/finalChallenge" passHref>
            <Button variant="contained" color="error">Desafío Final</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
