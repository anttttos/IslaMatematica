'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SumaResta = () => {
  const [expression, setExpression] = useState(''); // Guarda la expresión matemática
  const [correctAnswer, setCorrectAnswer] = useState(0); // Guarda el resultado correcto
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState(0); // Contador de ejercicios resueltos
  const goal = 5; // Meta de ejercicios para avanzar
  const router = useRouter();

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const numTerms = generateRandomNumber(3, 5); // Número de términos en la expresión (entre 3 y 5)
    let newExpression = '';
    let currentAnswer = 0;

    for (let i = 0; i < numTerms; i++) {
      const number = generateRandomNumber(1, 20); // Números entre 1 y 20
      const operator = i > 0 ? (Math.random() > 0.5 ? '+' : '-') : ''; // Operadores aleatorios

      newExpression += `${operator} ${number} `;
      currentAnswer = eval(newExpression.trim()); // Calcula el resultado (eval solo en entornos controlados)
    }

    setExpression(newExpression.trim());
    setCorrectAnswer(currentAnswer);
    setUserAnswer('');
    setFeedback('');
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Resolvamos otra combinación.');
      setCompletedExercises((prev) => prev + 1);
      generateNewProblem();
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }

    // Si se completa la meta, redireccionar
    if (completedExercises + 1 === goal) {
      setTimeout(() => {
        router.push('/game/multiplicacionDivision'); // Redirige a la siguiente página
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
        backgroundColor: '#a29bfe',
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Desafío de Suma y Resta
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta combinación para avanzar!
      </p>
      <p
        style={{
          fontSize: '1.2rem',
          color: '#fd79a8',
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
          color: '#55efc4',
        }}
      >
        {expression}
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
            backgroundColor: '#0984e3',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#74b9ff')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#0984e3')
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

export default SumaResta;
