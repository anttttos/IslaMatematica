// lib/mongodb.js
import { MongoClient } from 'mongodb';

let client;
let clientPromise;

if (!process.env.DATABASE_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.DATABASE_URI;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
    console.log('Conectando a MongoDB en modo desarrollo');
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
  console.log('Conectando a MongoDB en modo producción');
}

export default clientPromise;
