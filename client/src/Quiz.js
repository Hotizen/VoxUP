import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'What is your experience level in programming?',
    options: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    question: 'What type of coding interests you the most?',
    options: ['Python', 'React'],
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/lessons'); // Redirect to lessons after quiz
    }
  };

  return (
    <div className="quiz-container">
      <h3>{questions[currentQuestion].question}</h3>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className="btn btn-outline-primary"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
