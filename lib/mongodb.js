// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URI;
let client;
let clientPromise;

if (!process.env.DATABASE_URI) {
  throw new Error('Por favor, añade tu URI de MongoDB a .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

