// components/RegisterForm.js
import { useState } from 'react';
import { useTranslationClient } from '../hooks/useTranslationClient';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const { language, changeLanguage } = useTranslationClient();

  const handleRegister = () => {
    // Guarda el nombre de usuario y el idioma en Local Storage
    localStorage.setItem('username', username);
    localStorage.setItem('language', language);

    alert(`Usuario ${username} registrado con idioma ${language}`);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage); // Guardar idioma seleccionado en Local Storage
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Registro de Usuario</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <select value={language} onChange={handleLanguageChange}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default RegisterForm;
