// pages/api/login.js
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    const message =
      req.body.language === 'en'
        ? 'Method not allowed'
        : 'Método no permitido';
    return res.status(405).json({ message });
  }

  const { username, password, language } = req.body;

  if (!username || !password) {
    const message =
      language === 'en'
        ? 'Username and password are required'
        : 'Nombre de usuario y contraseña son obligatorios';
    return res.status(400).json({ message });
  }

  try {
    const client = await clientPromise;
    const db = client.db('IslaMatemática');
    const user = await db.collection('usuarios').findOne({ username });

    if (!user) {
      const message =
        language === 'en'
          ? 'Invalid credentials'
          : 'Credenciales incorrectas';
      return res.status(401).json({ message });
    }

    // Compara la contraseña ingresada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const message =
        language === 'en'
          ? 'Invalid credentials'
          : 'Credenciales incorrectas';
      return res.status(401).json({ message });
    }

    const message =
      language === 'en'
        ? 'Login successful'
        : 'Autenticación exitosa';
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    const message =
      language === 'en'
        ? 'Internal server error'
        : 'Error interno del servidor';
    res.status(500).json({ message });
  }
}
