// pages/game/GamePage.js
import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Button } from '@mui/material';

const zones = [
  { name: 'Playa de las Sumas', path: '/game/sumas' },
  { name: 'Selva de las Restas', path: '/game/restas' },
  { name: 'Montañas de la Multiplicación', path: '/game/multiplicacion' },
  { name: 'Cueva de la División', path: '/game/division' },
];

const GamePage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>Isla Matemática</Typography>
      <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
        {zones.map((zone, index) => (
          <Box key={index} textAlign="center" width="45%" marginBottom="1rem">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(zone.path)}
              style={{ width: '100%', padding: '1.5rem', fontSize: '1.2rem' }}
            >
              {zone.name}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default GamePage;
