'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Para redirigir al siguiente mundo

const Sumas = () => {
  const router = useRouter();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const targetScore = 5; // Meta para avanzar

  useEffect(() => {
    generateNewProblem();
  }, []);

  function generateNewProblem() {
    setNum1(generateRandomNumber(1, 50));
    setNum2(generateRandomNumber(1, 50));
    setUserAnswer('');
    setFeedback('');
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = num1 + num2;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Vamos con otra suma.');
      setScore(score + 1);
      if (score + 1 >= targetScore) {
        alert('¡Meta alcanzada! Avanzando al siguiente mundo...');
        router.push('/game/Restas'); // Redirige a la isla de las restas
      } else {
        generateNewProblem();
      }
    } else {
      setFeedback('Intenta de nuevo.');
    }
  };

  const handleSkip = () => {
    alert('Avanzando al siguiente mundo...');
    router.push('/game/Restas'); // Redirige a la isla de las restas
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
        backgroundColor: '#ffe4b5', // Fondo cálido y atractivo
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Desafío de Sumas
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta suma para avanzar!
      </p>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#007BFF',
        }}
      >
        {num1} + {num2} =
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
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
            marginBottom: '20px',
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#218838')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#28a745')
          }
        >
          Comprobar
        </button>
      </form>
      <button
        onClick={handleSkip}
        style={{
          padding: '15px 30px',
          fontSize: '1.5rem',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: '0.3s',
        }}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = '#0056b3')
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = '#007BFF')
        }
      >
        Saltar al siguiente mundo
      </button>
      <p style={{ fontSize: '1.2rem', marginTop: '20px', color: '#555' }}>
        {feedback}
      </p>
      <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#007BFF' }}>
        Progreso: {score}/{targetScore}
      </p>
    </div>
  );
};

export default Sumas;
