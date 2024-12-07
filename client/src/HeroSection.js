import React from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/quiz'); // Navigate to quiz or any other route
  };

  return (
    <div className="hero-section">
      <div className="hero-left">
        <h1 className="hero-title">Unlock Your Coding Potential</h1>
        <p className="hero-subtitle">
          Master coding with hands-free voice commands and gamified learning.
        </p>
        <button className="hero-cta" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <div className="hero-right">
        <img src='C:\Users\eo\coding-tutor\client\public\pexels-paras-4218883.jpg' alt="Coding" className="hero-image" />
      </div>
    </div>
  );
};

export default HeroSection;
