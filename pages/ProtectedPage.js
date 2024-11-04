// pages/protected.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verifica si el token de autenticación está en localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Si no hay token, redirige al login
    } else {
      // Puedes hacer una verificación adicional aquí, como consultar al servidor
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <p>Redirigiendo al login...</p>;
  }

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Solo usuarios autenticados pueden ver esta página.</p>
    </div>
  );
}
