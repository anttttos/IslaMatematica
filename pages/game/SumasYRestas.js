'use client';

import React from 'react';

const SumasYRestas = () => {
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
        backgroundColor: '#82ccdd',
      }}
    >
      <h1 style={{ fontSize: '3rem', color: '#2d3436', marginBottom: '20px' }}>
        ¡Bienvenido a Sumas y Restas!
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#535c68' }}>
        ¡Explora nuevas combinaciones de desafíos de sumas y restas para continuar con tu aventura!
      </p>
      <button
        style={{
          padding: '15px 30px',
          fontSize: '1.5rem',
          backgroundColor: '#60a3bc',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          marginTop: '30px',
        }}
        onClick={() => alert('¡Siguiente nivel desbloqueado pronto!')}
      >
        Continuar
      </button>
    </div>
  );
};

export default SumasYRestas;
