'use client';

import React, { useState, useEffect } from 'react';

const Restas = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateNewProblem();
  }, []);

  function generateNewProblem() {
    const a = generateRandomNumber(10, 50);
    const b = generateRandomNumber(1, 10);
    setNum1(a);
    setNum2(b);
    setUserAnswer('');
    setFeedback('');
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = num1 - num2;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Vamos con otra resta.');
      generateNewProblem();
    } else {
      setFeedback('Intenta de nuevo.');
    }
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
        backgroundColor: '#dff9fb', // Fondo relajante y atractivo
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Desafío de Restas
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta resta para avanzar!
      </p>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#ff6b6b',
        }}
      >
        {num1} - {num2} =
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Tu respuesta"
          style={{
            padding: '15px',
            fontSize: '1.5rem',
            marginBottom: '20px',
            width: '200px',
            textAlign: 'center',
            borderRadius: '10px',
            border: '2px solid #ccc',
          }}
        />
        <button
          type="submit"
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
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#c0392b')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#e74c3c')
          }
        >
          Comprobar
        </button>
      </form>
      <p style={{ fontSize: '1.2rem', marginTop: '20px', color: '#555' }}>
        {feedback}
      </p>
    </div>
  );
};

export default Restas;
