'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Restas = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0); // Contador de respuestas correctas
  const [hint, setHint] = useState(''); // Estado para mostrar la pista
  const router = useRouter();

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
    setHint(''); // Limpiar la pista cuando se genera un nuevo problema
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = num1 - num2;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Sigue resolviendo.');
      setCorrectAnswers((prev) => prev + 1);
      generateNewProblem();
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }
  };

  const handleHint = () => {
    // Proporcionar una pista en función de los números actuales
    const correctAnswer = num1 - num2;
    const hintMessage = `La resta de ${num1} - ${num2} está entre ${correctAnswer - 3} y ${correctAnswer + 3}.`;
    setHint(hintMessage);
  };

  const handleNextIsland = () => {
    router.push('/game/Multiplicacion'); // Redirige a la siguiente isla (Multiplicación)
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
        backgroundImage: 'url(/images/desierto.jpg)', // Ruta de tu imagen
        backgroundSize: 'cover', // Para que cubra todo el contenedor
        backgroundPosition: 'center', // Centrar la imagen
        backgroundRepeat: 'no-repeat', // No repetir la imagen
      }}
    >
      <h2 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
        Bienvenido al Desierto de las Restas
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta resta para avanzar!
      </p>
      <p
        style={{
          fontSize: '1.2rem',
          color: '#e74c3c',
          marginBottom: '20px',
        }}
      >
        Respuestas correctas: {correctAnswers}/5
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
      {correctAnswers >= 5 && (
        <button
          onClick={handleNextIsland}
          style={{
            padding: '15px 30px',
            fontSize: '1.5rem',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            marginTop: '30px',
          }}
        >
          Siguiente Isla: Invierno de la Multiplicación
        </button>
      )}
    </div>
  );
};

export default Restas;
