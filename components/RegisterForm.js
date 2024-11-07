// components/RegisterForm.js
import { useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem } from '@mui/material';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('es'); // Idioma predeterminado: español
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, language }), // Incluye el idioma
    });

    if (res.ok) {
      setMessage('Usuario registrado con éxito');
      setUsername('');
      setPassword('');
      setLanguage('es'); // Restablece el idioma a español después del registro
    } else {
      const { message } = await res.json();
      setMessage(message || 'Error en el registro');
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Registro de Usuario</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de usuario"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary" fullWidth>Registrar</Button>
      </form>
      {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
    </Container>
  );
};

export default RegisterForm;
