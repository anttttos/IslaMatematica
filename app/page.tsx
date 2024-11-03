// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a Isla Matemática</h1>
      <p>Explora las zonas de la isla para mejorar tus habilidades matemáticas.</p>
      <ul>
        <li><Link href="/sumas">Playa de las Sumas</Link></li>
        <li><Link href="/restas">Selva de las Restas</Link></li>
        <li><Link href="/multiplicacion">Montañas de la Multiplicación</Link></li>
        <li><Link href="/finalChallenge">Desafío Final</Link></li>
      </ul>
    </div>
  );
}