import React from 'react';
import './LessonCard.css';

const LessonCard = ({ title, description, onStartLesson }) => {
  return (
    <div className="lesson-card" onClick={onStartLesson}>
      <h3 className="lesson-card-title">{title}</h3>
      <p className="lesson-card-description">{description}</p>
      <button className="lesson-card-btn">Start Lesson</button>
    </div>
  );
};

export default LessonCard;
