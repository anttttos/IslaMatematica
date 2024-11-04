// components/RegisterForm.js
import { useState } from 'react';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Guarda el usuario y la contraseña cifrada en la base de datos a través de una API
    // Aquí puedes usar axios para enviar los datos a la API
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default RegisterForm;
