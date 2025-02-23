import React from 'react';
import './About.css';

const About = () => {
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
      description: `
        - Voice-controlled navigation and operations.
        - Personalized lesson suggestions based on skill level.
        - Gamified assessments with badges and leaderboards.
        - Real-time progress tracking and feedback.
      `,
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

  return (
    <div className="about-container">
      <h2 className="about-title">About VoxUp</h2>
      <div className="about-flashcards">
        {aboutContent.map((card, index) => (
          <div className="flashcard" key={index}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {card.links && (
              <ul>
                {card.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
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
};

export default About;
