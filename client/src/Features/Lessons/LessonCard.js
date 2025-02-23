import React from 'react';
import './LessonCard.css';

const LessonCard = ({ title, description, onStartLesson }) => {
  return (
    <div className="lesson-card" onClick={onStartLesson}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn btn-primary">Start Lesson</button>
    </div>
  );
};

export default LessonCard;
