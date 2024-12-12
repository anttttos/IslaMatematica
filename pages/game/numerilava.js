'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IslaLava = () => {
  const [expression, setExpression] = useState('');
  const [displayExpression, setDisplayExpression] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState('');
  const [globalHintCount, setGlobalHintCount] = useState(0); // Contador global de pistas
  const [completedExercises, setCompletedExercises] = useState(0);
  const goal = 20; // Meta de 20 ejercicios
  const maxHints = 3; // Total de pistas permitidas
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
        expressionString += ` ${operator} `;
        displayString += ` ${
          operator === '*' ? '×' : operator === '/' ? '÷' : operator
        } `;
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
    setHint('');
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleHint = () => {
    if (globalHintCount >= maxHints) {
      setHint('¡Ya has usado todas tus pistas permitidas en el Volcán!');
      return;
    }

    if (expression.includes('*') || expression.includes('/')) {
      setHint(
        'Recuerda: resuelve primero las multiplicaciones y divisiones, luego las sumas y restas de izquierda a derecha.'
      );
    } else if (correctAnswer < 10) {
      setHint('El resultado es un número pequeño, menor a 10.');
    } else if (correctAnswer > 50) {
      setHint('El resultado es un número grande, mayor a 50.');
    } else {
      const lowerBound = correctAnswer - 3;
      const upperBound = correctAnswer + 3;
      setHint(
        `El resultado está entre ${lowerBound} y ${upperBound}, pero no exactamente.`
      );
    }
    setGlobalHintCount((prev) => prev + 1); // Incrementar el contador global de pistas
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Avanzando al siguiente ejercicio.');
      setCompletedExercises((prev) => prev + 1);
      if (completedExercises + 1 < goal) {
        generateNewProblem();
      }
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }

    // Si se cumple la meta, redirigir
    if (completedExercises + 1 === goal) {
      setTimeout(() => {
        router.push('/game/final'); // Redirige a la página de felicitaciones
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
        backgroundImage: 'url(/images/volcan.jpg)', // Ruta de tu imagen
        backgroundSize: 'cover', // Para que cubra todo el contenedor
        backgroundPosition: 'center', // Centrar la imagen
        backgroundRepeat: 'no-repeat', // No repetir la imagen
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '20px' }}>
        Bienvenido al Volcán Numerilava: La Prueba Final
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#922b21')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#c0392b')}
        >
          Comprobar
        </button>
      </form>
      <button
        onClick={handleHint}
        style={{
          padding: '10px 20px',
          fontSize: '1.2rem',
          backgroundColor: '#FFC107',
          color: '#333',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#FFA000')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#FFC107')}
        disabled={globalHintCount >= maxHints}
      >
        Dame una pista ({globalHintCount}/{maxHints})
      </button>
      {hint && (
        <p
          style={{
            fontSize: '1.2rem',
            marginTop: '20px',
            color: '#fff',
            fontStyle: 'italic',
          }}
        >
          {hint}
        </p>
      )}
      <p style={{ fontSize: '1.2rem', marginTop: '20px', color: '#fff' }}>
        {feedback}
      </p>
    </div>
  );
};

export default IslaLava;
