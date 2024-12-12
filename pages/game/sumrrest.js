'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SumaResta = () => {
  const [expression, setExpression] = useState(''); // Guarda la expresión matemática
  const [correctAnswer, setCorrectAnswer] = useState(0); // Guarda el resultado correcto
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState(0); // Contador de ejercicios resueltos
  const [hint, setHint] = useState(''); // Guarda la pista
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
    setHint(''); // Limpiar la pista al generar un nuevo problema
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
  };

  const handleHint = () => {
    // Generar una pista basada en el resultado
    if (correctAnswer < 10) {
      setHint('El resultado es un número pequeño, menor a 10.');
    } else if (correctAnswer > 20) {
      setHint('El resultado es un número grande, mayor a 20.');
    } else {
      const lowerBound = correctAnswer - 2;
      const upperBound = correctAnswer + 2;
      setHint(
        `El resultado está entre ${lowerBound} y ${upperBound}, pero no exactamente.`
      );
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
          backgroundImage: 'url(/images/bosque.jpg)', // Ruta de tu imagen
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = '#FFA000')
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = '#FFC107')
        }
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
          onClick={() => router.push('/game/multiplidivina')}
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
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#341f97')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#6c5ce7')
          }
        >
          Siguiente Isla: Montañas Multiplidivinas
        </button>
      )}
    </div>
  );
};

export default SumaResta;
