'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Division = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState(0); // Contador de ejercicios resueltos
  const goal = 5; // Meta de ejercicios para avanzar
  const router = useRouter();

  useEffect(() => {
    generateNewProblem();
  }, []);

  function generateNewProblem() {
    const a = generateRandomNumber(1, 10) * generateRandomNumber(1, 10); // Multiplica para garantizar divisiones exactas
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
    const correctAnswer = num1 / num2;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Avancemos a la siguiente división.');
      setCompletedExercises((prev) => prev + 1);
      generateNewProblem();
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }

    // Si se completa la meta, redireccionar
    if (completedExercises + 1 === goal) {
      setTimeout(() => {
        router.push('/game/sumas-y-restas'); // Redirige a la página hipotética "Sumas y Restas"
      }, 1000); // Espera 1 segundo antes de redirigir
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
        backgroundColor: '#f6e58d', // Fondo atractivo con tonos cálidos
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Desafío de División
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta división para avanzar!
      </p>
      <p
        style={{
          fontSize: '1.2rem',
          color: '#ff7979',
          marginBottom: '20px',
        }}
      >
        Progreso: {completedExercises}/{goal} ejercicios completados
      </p>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#ffbe76',
        }}
      >
        {num1} ÷ {num2} =
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
            backgroundColor: '#e67e22',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#d35400')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#e67e22')
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

export default Division;
