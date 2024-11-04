// pages/api/usuarios.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('IslaMatematica'); // Cambia 'mydatabase' al nombre real de tu base de datos

    switch (req.method) {
      case 'GET':
        const usuarios = await db.collection('usuarios').find({}).toArray();
        res.status(200).json(usuarios);
        break;
      case 'POST':
        const { username, language } = req.body;
        if (!username || !language) {
          res.status(400).json({ message: 'Nombre de usuario e idioma son obligatorios' });
          return;
        }

        // Intenta insertar el usuario en la base de datos
        const result = await db.collection('usuarios').insertOne({ username, language });
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
