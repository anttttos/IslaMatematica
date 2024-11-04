// components/LoginForm.js
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar datos a la API de autenticación
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setMessage('Inicio de sesión exitoso');
      // Aquí puedes redirigir al usuario a la página protegida o almacenar un token
    } else {
      setMessage('Credenciales incorrectas');
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre de usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Iniciar Sesión
          </Button>
          {message && (
            <Typography variant="body2" color="textSecondary">
              {message}
            </Typography>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default LoginForm;
