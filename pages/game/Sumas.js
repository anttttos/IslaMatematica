'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Sumas = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState(0); // Contador de ejercicios resueltos
  const goal = 5; // Meta de ejercicios para avanzar
  const router = useRouter();

  useEffect(() => {
    // Verificar si el progreso permite acceder a esta página
    const progress = localStorage.getItem('progress');
    if (!progress || parseInt(progress) < 1) {
      router.push('/'); // Redirige a la página inicial si no tiene acceso
    }

    generateNewProblem();
  }, []);

  function generateNewProblem() {
    const a = generateRandomNumber(1, 20);
    const b = generateRandomNumber(1, 20);
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
    const correctAnswer = num1 + num2;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Avancemos al siguiente desafío.');
      setCompletedExercises((prev) => prev + 1);
      generateNewProblem();
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }

    // Si se completa la meta, actualiza el progreso
    if (completedExercises + 1 === goal) {
      localStorage.setItem('progress', '2'); // Avanzar al nivel siguiente
      setTimeout(() => {
        router.push('/game/restas'); // Redirige a la siguiente página
      }, 1000);
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
        backgroundColor: '#f5f6fa',
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Desafío de Sumas
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta suma para avanzar!
      </p>
      <p
        style={{
          fontSize: '1.2rem',
          color: '#4cd137',
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
          color: '#44bd32',
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
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#218c53')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#27ae60')
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

export default Sumas;
