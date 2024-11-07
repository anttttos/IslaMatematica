// pages/api/login.js
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nombre de usuario y contraseña son obligatorios' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('IslaMatemática');
    const user = await db.collection('usuarios').findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Compara la contraseña ingresada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: 'Autenticación exitosa' });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
