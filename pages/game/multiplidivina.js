'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MultiplicacionDivision = () => {
  const [expression, setExpression] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState(0);
  const goal = 5;
  const router = useRouter();

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const numTerms = generateRandomNumber(2, 4); // 2 a 4 términos
    let newExpression = '';
    let currentAnswer = generateRandomNumber(1, 10); // El primer número puede ser cualquiera

    newExpression += currentAnswer;

    for (let i = 1; i < numTerms; i++) {
      const operator = Math.random() > 0.5 ? '×' : '÷';
      let nextNumber;

      if (operator === '×') {
        nextNumber = generateRandomNumber(1, 10);
        currentAnswer *= nextNumber;
      } else {
        // Genera un divisor que sea factor del número actual
        nextNumber = generateFactor(currentAnswer);
        currentAnswer /= nextNumber;
      }

      newExpression += ` ${operator} ${nextNumber}`;
    }

    setExpression(newExpression.trim());
    setCorrectAnswer(currentAnswer);
    setUserAnswer('');
    setFeedback('');
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateFactor = (number) => {
    const factors = [];
    for (let i = 1; i <= number; i++) {
      if (number % i === 0) {
        factors.push(i);
      }
    }
    return factors[Math.floor(Math.random() * factors.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Avancemos a la siguiente combinación.');
      setCompletedExercises((prev) => prev + 1);
      generateNewProblem();
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }

    if (completedExercises + 1 === goal) {
      setTimeout(() => {
        router.push('/game/trioperante'); // Redirige a la siguiente página
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
        backgroundColor: '#ffeaa7',
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Desafío de Multiplicación y División
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta combinación para avanzar!
      </p>
      <p style={{ fontSize: '1.2rem', color: '#ff7675', marginBottom: '20px' }}>
        Progreso: {completedExercises}/{goal} ejercicios completados
      </p>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#fab1a0',
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
            backgroundColor: '#e17055',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#d63031')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#e17055')}
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

export default MultiplicacionDivision;
