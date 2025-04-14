import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroToPython.css';

const IntroToPython = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/python-basics');
  };

  return (
    <div className="intro-to-python">
      <h1>Introduction to Python</h1>
      <p>
        Python is a versatile, high-level programming language known for its readability and simplicity. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python is widely used in web development, data analysis, artificial intelligence, machine learning, automation, and more.
      </p>

      <div className="section">
        <h2>Why Learn Python?</h2>
        <ul>
          <li>Cross-platform compatibility (Windows, Mac, Linux, Raspberry Pi, etc).</li>
          <li>Clean and readable syntax that’s close to English.</li>
          <li>Large standard library and thriving ecosystem of third-party packages.</li>
          <li>Supports automation, scripting, data analysis, AI, and web development.</li>
          <li>Backed by a strong community and a wealth of learning resources.</li>
        </ul>
      </div>

      <div className="section">
        <h2>Who Uses Python?</h2>
        <p>
          Python is used by professionals across many industries. Developers at Google, Facebook, NASA, and Netflix use Python for various backend services, automation tools, and scientific computations.
        </p>
      </div>

      <div className="section">
        <h2>Key Features of Python</h2>
        <ul>
          <li>Interpreted Language: Code is executed line-by-line.</li>
          <li>Dynamically Typed: No need to declare variable types.</li>
          <li>Extensive Libraries: From data science to web frameworks.</li>
          <li>Beginner-Friendly: Great first language for new programmers.</li>
        </ul>
      </div>

      <div className="section">
        <h2>Applications of Python</h2>
        <ul>
          <li>Data Science and Machine Learning</li>
          <li>Web Development (using frameworks like Django and Flask)</li>
          <li>Desktop Application Development</li>
          <li>Internet of Things (IoT)</li>
          <li>Game Development</li>
          <li>Automation and Scripting</li>
        </ul>
      </div>

      <button className="continue-button" onClick={handleContinue}>
        Continue to Python Basics
      </button>
    </div>
  );
};

export default IntroToPython;
