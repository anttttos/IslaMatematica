import clientPromise from '../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
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

      // Verificar si el usuario ya existe
      const existingUser = await db.collection('usuarios').findOne({ username });
      if (existingUser) {
        return res.status(409).json({ // Código 409: Conflicto
          message: language === 'en' ? 'Username already taken' : 'El nombre de usuario ya está en uso'
        });
      }

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