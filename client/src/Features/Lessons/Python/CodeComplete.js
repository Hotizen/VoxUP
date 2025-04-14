import React, { useState } from 'react';
import './CodeComplete.css';

const challenges = [
  {
    title: "Challenge 1: Print Hello World",
    question: `# Print "Hello, World!" in Python\nprint(________)`,
    answer: `"Hello, World!"`,
  },
  {
    title: "Challenge 2: Sum of Two Numbers",
    question: `# Add two numbers and print the result\na = 5\nb = 3\nsum = ________\nprint(sum)`,
    answer: `a + b`,
  },
  {
    title: "Challenge 3: If-Else Condition",
    question: `# Check if a number is even or odd\nnum = 4\nif num % 2 == 0:\n    print(__________)\nelse:\n    print("Odd number")`,
    answer: `"Even number"`,
  },
  {
    title: "Challenge 4: Loop Through a List",
    question: `# Print each item in a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in ________:\n    print(fruit)`,
    answer: `fruits`,
  },
  {
    title: "Challenge 5: Function Definition",
    question: `# Define a function to return the square of a number\ndef square(n):\n    return ________\n\nprint(square(4))  # Output should be 16`,
    answer: `n * n`,
  },
];

const CodeComplete = ({ updateProgress }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const current = challenges[currentChallenge];

  const handleCheckAnswer = () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput === current.answer) {
      setFeedbackMessage("✅ Correct! Well done.");
      setTimeout(() => {
        setFeedbackMessage('');
        handleNextChallenge();
      }, 1000);
    } else {
      setFeedbackMessage("❌ Incorrect! Try again.");
    }
  };

  const handleNextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setUserInput('');
      setShowAnswer(false);
    } else {
      setFeedbackMessage("🎉 All Challenges Completed!");
    }
  };

  return (
    <div className="codecomplete-container">
      <h3 className="codecomplete-title">{current.title}</h3>

      <pre className="codecomplete-block">{current.question}</pre>

      <input
        className="codecomplete-input"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your answer here..."
      />

      <div className="codecomplete-buttons">
        <button className="codecomplete-btn" onClick={handleCheckAnswer}>
          Check Answer
        </button>
        <button className="codecomplete-btn secondary" onClick={() => setShowAnswer(true)}>
          Show Answer
        </button>
      </div>

      {showAnswer && (
        <div className="codecomplete-answer">
          ✅ Correct Answer: <code>{current.answer}</code>
        </div>
      )}

      {feedbackMessage && (
        <div className="codecomplete-feedback">{feedbackMessage}</div>
      )}
    </div>
  );
};

export default CodeComplete;
