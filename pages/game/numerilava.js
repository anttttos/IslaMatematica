'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IslaLava = () => {
  const [expression, setExpression] = useState('');
  const [displayExpression, setDisplayExpression] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState(0);
  const goal = 5; // Meta para avanzar
  const router = useRouter();

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const numTerms = generateRandomNumber(3, 5); // Número de términos en la expresión
    const operators = ['+', '-', '*', '/'];
    const numbers = [];
    const ops = [];

    for (let i = 0; i < numTerms; i++) {
      numbers.push(generateRandomNumber(1, 10)); // Números aleatorios
      if (i < numTerms - 1) {
        ops.push(operators[Math.floor(Math.random() * operators.length)]); // Operadores aleatorios
      }
    }

    // Construir la expresión con operaciones seguras
    let expressionString = '';
    let displayString = '';
    for (let i = 0; i < numbers.length; i++) {
      expressionString += numbers[i];
      displayString += numbers[i];
      if (i < ops.length) {
        const operator = ops[i];
        expressionString += ` ${operator === '*' ? '*' : operator === '/' ? '/' : operator} `;
        displayString += ` ${operator === '*' ? '×' : operator === '/' ? '÷' : operator} `;
      }
    }

    // Evaluar resultado asegurándose de no incluir divisiones decimales
    let result = eval(expressionString);
    if (!Number.isInteger(result)) {
      return generateNewProblem(); // Regenerar si el resultado no es entero
    }

    setExpression(expressionString.trim());
    setDisplayExpression(displayString.trim());
    setCorrectAnswer(result);
    setUserAnswer('');
    setFeedback('');
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Avanzando al siguiente ejercicio.');
      setCompletedExercises((prev) => prev + 1);
      generateNewProblem();
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }

    // Si se cumple la meta, redirigir
    if (completedExercises + 1 === goal) {
      setTimeout(() => {
        router.push('/game/finalIsla'); // Redirige a la siguiente página
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
        backgroundColor: '#ff6b6b', // Fondo de lava
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '20px' }}>
        Isla de Lava: La Prueba Final
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#fff' }}>
        ¡Resuelve esta combinación para avanzar!
      </p>
      <p style={{ fontSize: '1.2rem', color: '#ffeb3b', marginBottom: '20px' }}>
        Progreso: {completedExercises}/{goal} ejercicios completados
      </p>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#fff',
        }}
      >
        {displayExpression}
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
            backgroundColor: '#c0392b',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#922b21')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#c0392b')
          }
        >
          Comprobar
        </button>
      </form>
      <p style={{ fontSize: '1.2rem', marginTop: '20px', color: '#fff' }}>
        {feedback}
      </p>
    </div>
  );
};

export default IslaLava;
