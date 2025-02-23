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
        Python is a high-level, interpreted, interactive, and object-oriented scripting language.
        It is designed to be highly readable, using English keywords frequently whereas other languages use punctuation.
      </p>
      <h2>Why Learn Python?</h2>
      <ul>
        <li>Python works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc).</li>
        <li>It has a simple syntax similar to English.</li>
        <li>Python allows developers to write programs with fewer lines than other programming languages.</li>
      </ul>
      <button className="btn btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default IntroToPython;
