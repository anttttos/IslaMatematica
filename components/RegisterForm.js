// components/RegisterForm.js
import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, Box } from '@mui/material';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('es'); // Idioma predeterminado
  const [message, setMessage] = useState(''); // Mensaje de feedback

  // useEffect para cargar nombre y idioma desde localStorage si estamos en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('username');
      const savedLanguage = localStorage.getItem('language');

      if (savedUsername) setUsername(savedUsername);
      if (savedLanguage) setLanguage(savedLanguage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guardar en localStorage solo si estamos en el cliente
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', username);
      localStorage.setItem('language', language);
    }

    // Enviar los datos del usuario a la API
    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, language }),
    });

    if (res.ok) {
      setMessage('Usuario registrado con éxito');
      setUsername(''); // Limpiar el campo de nombre de usuario
    } else {
      setMessage('Hubo un error al registrar el usuario');
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Registro de Usuario
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
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
          <Button type="submit" variant="contained" color="primary">
            Registrar
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

export default RegisterForm;
