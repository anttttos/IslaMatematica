// pages/game/multiplicacion.js
import { useState } from 'react';
import { Button, Typography, Container, TextField } from '@mui/material';

export default function MultiplicacionChallenge() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return { num1, num2, answer: num1 * num2 };
  }

  const handleCheckAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 1);
      setFeedback('¡Correcto!');
    } else {
      setFeedback('Incorrecto, intenta nuevamente.');
    }
    setUserAnswer('');
    setQuestion(generateQuestion());
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4">Montañas de la Multiplicación</Typography>
      <Typography variant="body1" style={{ margin: '1rem 0' }}>
        Resuelve la multiplicación: {question.num1} x {question.num2}
      </Typography>
      <TextField
        label="Respuesta"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        type="number"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckAnswer}
        style={{ marginLeft: '1rem' }}
      >
        Comprobar
      </Button>
      <Typography variant="body1" style={{ margin: '1rem 0', color: feedback === '¡Correcto!' ? 'green' : 'red' }}>
        {feedback}
      </Typography>
      <Typography variant="h6">Puntaje: {score}</Typography>
    </Container>
  );
}
