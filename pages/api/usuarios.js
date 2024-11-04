// pages/api/usuarios.js
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('IslaMatemática');

    switch (req.method) {
      case 'GET':
        const usuarios = await db.collection('usuarios').find({}).toArray();
        res.status(200).json(usuarios);
        break;
      case 'POST':
        const { username, password, language } = req.body;
        if (!username || !password || !language) {
          res.status(400).json({ message: 'Nombre de usuario, contraseña e idioma son obligatorios' });
          return;
        }

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Intenta insertar el usuario en la base de datos
        const result = await db.collection('usuarios').insertOne({ username, password: hashedPassword, language });
        if (result.acknowledged) {
          res.status(201).json({ message: 'Usuario agregado!' });
        } else {
          res.status(500).json({ message: 'No se pudo agregar el usuario a la base de datos' });
        }
        break;
      default:
        res.status(405).end(); // Método no permitido
        break;
    }
  } catch (error) {
    console.error('Error en la API de usuarios:', error);
    res.status(500).json({ message: 'Error al conectar con la base de datos', error: error.message });
  }
}
