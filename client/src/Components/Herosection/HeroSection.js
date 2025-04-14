import React from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import heroimg from '../../Assets/images/pexels-paras-4218883.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/quiz');
  };

  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1 className="hero-title">Unlock Your Coding Potential</h1>
        <p className="hero-subtitle">
          Master coding with hands-free voice commands and gamified learning.
        </p>
        <button className="hero-cta" onClick={handleGetStarted} aria-label="Start quiz">
          🚀 Get Started
        </button>
      </div>
      <div className="hero-right">
        <img src={heroimg} alt="Person coding" className="hero-image" />
      </div>
    </section>
  );
};

export default HeroSection;
