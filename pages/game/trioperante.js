'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SumaRestaMultiplicacion = () => {
  const [expression, setExpression] = useState('');
  const [displayExpression, setDisplayExpression] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState(''); // Para las pistas
  const [completedExercises, setCompletedExercises] = useState(0);
  const goal = 5;
  const router = useRouter();

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const numTerms = generateRandomNumber(3, 5); // Número de términos en la expresión
    const operators = ['+', '-', '*'];
    const numbers = [];
    const ops = [];

    for (let i = 0; i < numTerms; i++) {
      numbers.push(generateRandomNumber(1, 10)); // Números aleatorios
      if (i < numTerms - 1) {
        ops.push(operators[Math.floor(Math.random() * operators.length)]); // Operadores aleatorios
      }
    }

    // Genera la expresión en formato string
    let expressionString = numbers[0].toString();
    let displayString = numbers[0].toString();
    let currentAnswer = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      expressionString += ` ${ops[i - 1]} ${numbers[i]}`;
      displayString += ` ${ops[i - 1] === '*' ? '×' : ops[i - 1]} ${numbers[i]}`;
      currentAnswer = eval(expressionString); // Calcula el resultado paso a paso
    }

    setExpression(expressionString.trim());
    setDisplayExpression(displayString.trim());
    setCorrectAnswer(Math.round(currentAnswer)); // Resultado redondeado para evitar errores de precisión
    setUserAnswer('');
    setFeedback('');
    setHint(''); // Reinicia la pista al generar un nuevo problema
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleHint = () => {
    if (expression.includes('*')) {
      setHint(
        'Recuerda que las multiplicaciones se resuelven primero, luego las sumas y restas de izquierda a derecha.'
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
        backgroundImage: 'url(/images/nubes.jpg)', // Ruta de tu imagen
        backgroundSize: 'cover', // Para que cubra todo el contenedor
        backgroundPosition: 'center', // Centrar la imagen
        backgroundRepeat: 'no-repeat', // No repetir la imagen
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Isla de Suma, Resta y Multiplicación
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta combinación para avanzar!
      </p>
      <p style={{ fontSize: '1.2rem', color: '#17a589', marginBottom: '20px' }}>
        Progreso: {completedExercises}/{goal} ejercicios completados
      </p>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1abc9c',
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
            backgroundColor: '#1abc9c',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#148f77')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1abc9c')}
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
      >
        Dame una pista
      </button>
      {hint && (
        <p
          style={{
            fontSize: '1.2rem',
            marginTop: '20px',
            color: '#555',
            fontStyle: 'italic',
          }}
        >
          {hint}
        </p>
      )}
      <p style={{ fontSize: '1.2rem', marginTop: '20px', color: '#555' }}>
        {feedback}
      </p>
      {completedExercises >= goal && (
        <button
          onClick={() => router.push('/game/numerilava')}
          style={{
            marginTop: '30px',
            padding: '15px 30px',
            fontSize: '1.5rem',
            backgroundColor: '#6c5ce7',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#341f97')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#6c5ce7')}
        >
          Siguiente Isla: Volcán Numerilava
        </button>
      )}
    </div>
  );
};

export default SumaRestaMultiplicacion;
