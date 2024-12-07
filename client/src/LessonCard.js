import React from 'react';

// LessonCard component (reusable card with props)
const LessonCard = ({ title, description, onStartLesson }) => (
    <div className="lesson-card" onClick={onStartLesson}>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="btn btn-primary">Start Lesson</button>
    </div>
);

// LessonCards component (renders multiple LessonCards)
const LessonCards = () => {
  const lessons = [
    { title: 'Lesson 1: Intro to JavaScript', description: 'Learn the basics of JavaScript programming.' },
    { title: 'Lesson 2: Intro to React', description: 'Understand the basics of React and components.' },
    // Add more lesson objects as needed
  ];

  return (
    <div className="container">
      <div className="row">
        {lessons.map((lesson) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={lesson.title}>
            <LessonCard
              title={lesson.title}
              description={lesson.description}
              onSelect={() => console.log(`Starting Lesson: ${lesson.title}`)} // Replace with actual functionality
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonCard;