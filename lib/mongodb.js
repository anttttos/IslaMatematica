// lib/mongodb.js
import { MongoClient } from 'mongodb';

let client;
let clientPromise;

// Verifica que DATABASE_URI esté definida en las variables de entorno
if (!process.env.DATABASE_URI) {
  throw new Error('Por favor, agrega tu URI de MongoDB en el archivo .env.local');
}

const uri = process.env.DATABASE_URI;

// Manejar la conexión de manera diferente en desarrollo y en producción
if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usamos una variable global para mantener la conexión entre cambios de código
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, se crea un nuevo cliente para cada conexión
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
