// pages/register.js
import clientPromise from '../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, language } = req.body; // Incluimos el idioma

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

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar el usuario en la base de datos
      const result = await db.collection('usuarios').insertOne({ username, password: hashedPassword });

      if (result.acknowledged) {
        const message =
          language === 'en'
            ? 'User registered successfully'
            : 'Usuario registrado con éxito';
        res.status(201).json({ message });
      } else {
        const message =
          language === 'en'
            ? 'Error registering the user'
            : 'Error al registrar el usuario';
        res.status(500).json({ message });
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      const message =
        language === 'en'
          ? 'Server error'
          : 'Error en el servidor';
      res.status(500).json({ message });
    }
  } else {
    const message =
      req.body.language === 'en'
        ? 'Method not allowed'
        : 'Método no permitido';
    res.status(405).json({ message });
  }
}
