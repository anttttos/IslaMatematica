'use client';

import { useRouter } from 'next/navigation';

const FinalPage = () => {
  const router = useRouter();

  const handleBackToIslands = () => {
    router.push('/game'); // Cambia a la página inicial del carrusel o islas
  };

  const handleRegister = () => {
    router.push('/auth'); // Redirige a la página de registro
  };

  return (
    <div
      style={{
        textAlign: 'center',
          padding: '50px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(/images/celebracion.jpg)', // Ruta de tu imagen
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '20px' }}>
        ¡Felicidades, completaste el desafío final!
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '40px', color: '#34495e' }}>
        Gracias por participar en este emocionante viaje matemático.
      </p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={handleBackToIslands}
          style={{
            padding: '15px 30px',
            fontSize: '1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
        >
          Seguir Resolviendo Desafios y Volver a las Islas
        </button>
        <button
          onClick={handleRegister}
          style={{
            padding: '15px 30px',
            fontSize: '1.5rem',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
        >
          Guarda Tu Progreso Creando una Cuenta
        </button>
      </div>
    </div>
  );
};

export default FinalPage;