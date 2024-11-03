// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ padding: '10px', background: '#4CAF50', color: 'white' }}>
      <h1>Isla Matemática</h1>
      <nav>
        <Link href="/">Inicio</Link> | 
        <Link href="/sumas">Suma</Link> | 
        <Link href="/restas">Resta</Link> | 
        <Link href="/multiplicacion">Multiplicación</Link> | 
        <Link href="/finalChallenge">Desafío Final</Link>
      </nav>
    </header>
  );
};

export default Header;
