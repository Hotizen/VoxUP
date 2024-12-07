import React from 'react';
import { useLocation } from 'react-router-dom';
import LessonCard from './LessonCard';

const LessonGrid = () => {
  const location = useLocation();
  const suggestions = location.state?.suggestions || []; // Get personalized suggestions from quiz

  // Generic lessons
  const lessons = [
    { title: 'Intro to Python', description: 'Learn Python programming basics' },
    { title: 'React Basics', description: 'Understand React components and JSX' },
    { title: 'Advanced React', description: 'Learn React hooks and advanced concepts' },
    { title: 'JavaScript Essentials', description: 'Understand core JavaScript concepts' },
  ];

  const startLesson = (lessonTitle) => {
    console.log(`Starting lesson: ${lessonTitle}`);
  };

  return (
    <div className="container">
      {suggestions.length > 0 && (
        <div className="suggested-lessons">
          <h2>Recommended Lessons</h2>
          <div className="row">
            {suggestions.map((lesson, index) => (
              <div className="col-md-6" key={index}>
                <LessonCard
                  title={lesson}
                  description="A personalized lesson based on your quiz answers"
                  onStartLesson={() => startLesson(lesson)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <h2>All Lessons</h2>
      <div className="row">
        {lessons.map((lesson, index) => (
          <div className="col-md-6" key={index}>
            <LessonCard
              title={lesson.title}
              description={lesson.description}
              onStartLesson={() => startLesson(lesson.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonGrid;
