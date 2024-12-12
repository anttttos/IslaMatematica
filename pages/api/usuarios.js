// pages/api/usuarios.js
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, language } = req.body;

    if (!username || !password || !language) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('IslaMatemática');

      // Verificar si el usuario ya existe
      const existingUser = await db.collection('usuarios').findOne({ username });
      if (existingUser) {
        return res.status(409).json({
          message: language === 'en' ? 'Username already taken' : 'El nombre de usuario ya está en uso',
        });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar el usuario en la base de datos
      const result = await db.collection('usuarios').insertOne({
        username,
        password: hashedPassword,
        language,
      });

      if (result.acknowledged) {
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      } else {
        res.status(500).json({ message: 'Error al registrar el usuario' });
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}