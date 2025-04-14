import React from 'react';
import './About.css';

const aboutContent = [
  {
    title: 'What is VoxUp?',
    description:
      'VoxUp is a voice-controlled coding learning platform designed to make coding education interactive, accessible, and gamified. It focuses on voice commands for navigation and learning, offering a unique hands-free experience.',
  },
  {
    title: 'How is it Different?',
    description:
      'Unlike traditional learning platforms, VoxUp integrates voice recognition and gamified elements to engage learners. Its personalized lessons, leaderboards, and quizzes adapt to individual learning styles.',
  },
  {
    title: 'Key Features',
    description:
      '• Voice-controlled navigation and operations.\n• Personalized lesson suggestions based on skill level.\n• Gamified assessments with badges and leaderboards.\n• Real-time progress tracking and feedback.',
  },
  {
    title: 'Research & Insights',
    description:
      'VoxUp is inspired by research on gamification and voice interaction in education. Explore supporting studies:',
    links: [
      {
        label: 'Study on Gamification in Learning',
        url: 'https://example.com/gamification-study',
      },
      {
        label: 'Benefits of Voice Control in Education',
        url: 'https://example.com/voice-education',
      },
    ],
  },
];

const About = () => (
  <div className="about-container">
    <h2 className="about-title">About VoxUp</h2>
    <div className="about-flashcards">
      {aboutContent.map((card, idx) => (
        <div className="flashcard" key={idx}>
          <h3>{card.title}</h3>
          <p>
            {card.description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
          {card.links && (
            <ul>
              {card.links.map(({ label, url }, linkIdx) => (
                <li key={linkIdx}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default About;
