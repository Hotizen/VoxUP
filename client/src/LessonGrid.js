import React from 'react';
import LessonCard from './LessonCard';

const LessonGrid = () => {
  const lessons = [
    { title: 'Intro to Python', description: 'Learn Python programming basics' },
    { title: 'React Basics', description: 'Understand React components and JSX' },
  ];

  const startLesson = (lessonTitle) => {
    console.log(`Starting lesson: ${lessonTitle}`);
  };

  return (
    <div className="container">
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
