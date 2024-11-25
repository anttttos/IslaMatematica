'use client';
import './globals.css';
import { ReactNode, useEffect, useState } from 'react';
import i18n from '../i18n';
import { Select, MenuItem } from '@mui/material';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // Estado local para controlar el idioma
  const [language, setLanguage] = useState('es');

  // Efecto para cargar el idioma de localStorage al montar
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'es';
    setLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);
  }, []);

  // Manejar cambio de idioma
  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newLanguage = event.target.value as string;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <html lang={language}>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'url("https://img.freepik.com/vector-premium/isla-tropical-dibujos-animados-palmeras-montanas-mar-azul-flores-vides-ilustracion_273525-12.jpg") no-repeat center center fixed',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <Select
            value={language}
            onChange={handleLanguageChange}
            style={{ background: '#ffffff', borderRadius: '5px', padding: '5px' }}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </div>
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '30px',
            borderRadius: '15px',
            maxWidth: '600px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {children}
        </main>
        <footer
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            color: '#ffffff',
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          &copy; 2024 Isla Matemática
        </footer>
      </body>
    </html>
  );
};

export default Layout;
