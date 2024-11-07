// pages/register.js
import clientPromise from '../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Nombre de usuario y contraseña son obligatorios' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('IslaMatemática');

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar el usuario en la base de datos
      const result = await db.collection('usuarios').insertOne({ username, password: hashedPassword });

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
