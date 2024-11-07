// pages/game/sumas.js
import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';

const SumaChallenge = () => {
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const answer = 7; // Cambia este valor para el desafío

  const handleCheckAnswer = () => {
    if (parseInt(userInput) === answer) {
      setMessage('¡Correcto! Bien hecho.');
    } else {
      setMessage('Intenta de nuevo.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Playa de las Sumas</Typography>
      <Typography variant="body1" paragraph>
        ¿Cuál es el resultado de 3 + 4?
      </Typography>
      <TextField
        label="Tu respuesta"
        variant="outlined"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
      <Button variant="contained" color="primary" onClick={handleCheckAnswer}>
        Comprobar respuesta
      </Button>
      {message && (
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default SumaChallenge;
