// pages/api/usuarios.js
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, language } = req.body; // Agrega idioma aquí

    if (!username || !password || !language) {
      return res.status(400).json({ message: 'Nombre de usuario, contraseña e idioma son obligatorios' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('IslaMatemática');

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.collection('usuarios').insertOne({
        username,
        password: hashedPassword,
        language, // Guarda el idioma preferido
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
