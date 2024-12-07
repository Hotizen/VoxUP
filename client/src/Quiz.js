import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { 
    question: 'What is your experience level in programming?', 
    options: ['Beginner', 'Intermediate', 'Advanced'] 
  },
  { 
    question: 'What type of coding interests you the most?', 
    options: ['Python', 'React', 'JavaScript', 'Full-Stack'] 
  },
  { 
    question: 'What is your preferred learning style?', 
    options: ['Hands-on Projects', 'Interactive Lessons', 'Reading Books', 'Video Tutorials'] 
  },
  { 
    question: 'Do you prefer structured or unstructured learning?', 
    options: ['Structured', 'Unstructured'] 
  },
  { 
    question: 'Would you like to learn at your own pace or follow a set schedule?', 
    options: ['Own Pace', 'Set Schedule'] 
  }
];

const lessonsSuggestions = {
  Beginner: ['Intro to Python', 'JavaScript Essentials'],
  Intermediate: ['React Basics', 'Python for Data Science'],
  Advanced: ['Advanced React', 'Full-Stack Development'],
  Python: ['Intro to Python', 'Python for Data Science'],
  React: ['React Basics', 'Advanced React'],
  JavaScript: ['JavaScript Essentials', 'Advanced JavaScript'],
  'Hands-on Projects': ['React Projects', 'Python Projects'],
  'Interactive Lessons': ['React Basics', 'Intro to Python'],
  'Reading Books': ['JavaScript Essentials', 'Python for Data Science'],
  'Video Tutorials': ['Full-Stack Development', 'Advanced React'],
  Structured: ['Intro to Python', 'React Basics'],
  Unstructured: ['Advanced JavaScript', 'Python for Data Science'],
  'Own Pace': ['Python for Data Science', 'Full-Stack Development'],
  'Set Schedule': ['React Basics', 'Advanced React']
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

    // If we have more questions, move to the next one
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to lessons with suggestions
      navigate('/lessons', { state: { suggestions } });
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
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
    </div>
  );
};

export default Quiz;
