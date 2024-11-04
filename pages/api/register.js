// pages/api/usuarios.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  // Conectarse a la base de datos
  const client = await clientPromise;
  const db = client.db('mydatabase'); // Cambia 'mydatabase' por el nombre de tu base de datos en MongoDB

  switch (req.method) {
    case 'GET':
      // Obtener todos los documentos en la colección "usuarios"
      const usuarios = await db.collection('usuarios').find({}).toArray();
      res.status(200).json(usuarios);
      break;
    case 'POST':
      // Insertar un nuevo usuario en la colección "usuarios"
      const nuevoUsuario = req.body;
      await db.collection('usuarios').insertOne(nuevoUsuario);
      res.status(201).json({ message: 'Usuario agregado!' });
      break;
    default:
      res.status(405).end(); // Método no permitido
      break;
  }
}
