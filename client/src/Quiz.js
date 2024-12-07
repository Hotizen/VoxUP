import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { question: 'What is your experience level in programming?', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { question: 'What type of coding interests you the most?', options: ['Python', 'React', 'JavaScript'] },
  { question: 'What is your preferred learning style?', options: ['Hands-on Projects', 'Interactive Lessons'] },
];

const lessonsSuggestions = {
  Beginner: ['Intro to Python', 'JavaScript Essentials'],
  Intermediate: ['React Basics', 'Python for Data Science'],
  Advanced: ['Advanced React', 'Full-Stack Development'],
  Python: ['Intro to Python', 'Python for Data Science'],
  React: ['React Basics', 'Advanced React'],
  JavaScript: ['JavaScript Essentials', 'Advanced JavaScript'],
};

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);

    // Add suggestions based on answers
    if (lessonsSuggestions[answer]) {
      setSuggestions((prev) => [...new Set([...prev, ...lessonsSuggestions[answer]])]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/lessons', { state: { suggestions } }); // Navigate with suggestions
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
      <div className="progress-indicator">
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </div>
  );
};

export default Quiz;
