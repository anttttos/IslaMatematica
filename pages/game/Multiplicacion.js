'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Multiplicacion = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completedExercises, setCompletedExercises] = useState(0); // Contador de ejercicios resueltos
  const [hint, setHint] = useState(''); // Estado para la pista
  const goal = 5; // Meta de ejercicios para avanzar
  const router = useRouter();

  useEffect(() => {
    generateNewProblem();
  }, []);

  function generateNewProblem() {
    const a = generateRandomNumber(1, 10);
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
    const correctAnswer = num1 * num2;

    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback('¡Correcto! Avancemos a la siguiente multiplicación.');
      setCompletedExercises((prev) => prev + 1);
      generateNewProblem();
    } else {
      setFeedback('Respuesta incorrecta. ¡Intenta de nuevo!');
    }
  };

  const handleHint = () => {
    // Proporcionar una pista en función de los números actuales
    const correctAnswer = num1 * num2;
    const hintMessage = `El resultado está entre ${correctAnswer - 2} y ${correctAnswer + 2}.`;
    setHint(hintMessage);
  };

  const handleNext = () => {
    if (completedExercises >= goal) {
      router.push('/game/division'); // Redirige a la página de la división
    } else {
      setFeedback(
        `Debes completar ${goal - completedExercises} ejercicios más para avanzar.`
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
        backgroundImage: 'url(/images/invierno.jpg)', // Ruta de tu imagen
        backgroundSize: 'cover', // Para que cubra todo el contenedor
        backgroundPosition: 'center', // Centrar la imagen
        backgroundRepeat: 'no-repeat', // No repetir la imagen
      }}
    >
      <h2 style={{ fontSize: '3rem', color: 'red', marginBottom: '20px' }}>
        Bienvenido al Invierno de la Multiplicación
      </h2>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        ¡Resuelve esta multiplicación para avanzar!
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
        {num1} × {num2} =
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
          onClick={handleNext}
          style={{
            marginTop: '30px',
            padding: '15px 30px',
            fontSize: '1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = '#2980b9')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = '#3498db')
          }
        >
          Siguiente Isla: Playa de la División
        </button>
      )}
    </div>
  );
};

export default Multiplicacion;
