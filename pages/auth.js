// pages/auth.js
import { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Button
          variant={isLogin ? "contained" : "outlined"}
          onClick={() => setIsLogin(true)}
          style={{
            backgroundColor: isLogin ? '#2196f3' : 'transparent',
            color: isLogin ? 'white' : '#2196f3',
            borderColor: isLogin ? '#2196f3' : 'gray'
          }}
        >
          Iniciar Sesión
        </Button>
        <Button
          variant={!isLogin ? "contained" : "outlined"}
          onClick={() => setIsLogin(false)}
          style={{
            backgroundColor: !isLogin ? '#2196f3' : 'transparent',
            color: !isLogin ? 'white' : '#2196f3',
            borderColor: !isLogin ? '#2196f3' : 'gray'
          }}
        >
          Registrarse
        </Button>
      </Box>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </Container>
  );
}
