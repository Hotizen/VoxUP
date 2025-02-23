import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LessonCard from './LessonCard';
import './LessonGrid.css';

const lessons = [
  { id: 1, title: 'Intro to Python', description: 'Learn Python programming basics.' },
  { id: 2, title: 'React Basics', description: 'Understand React components and JSX.' },
  { id: 3, title: 'Advanced React', description: 'Learn React hooks and advanced concepts.' },
  { id: 4, title: 'JavaScript Essentials', description: 'Understand core JavaScript concepts.' },
  { id: 5, title: 'HTML & CSS', description: 'Design beautiful web pages with HTML and CSS.' },
  { id: 6, title: 'Node.js Basics', description: 'Get started with backend development using Node.js.' },
  { id: 7, title: 'Express.js', description: 'Learn to build RESTful APIs with Express.js.' },
  { id: 8, title: 'MongoDB', description: 'Understand database design with MongoDB.' },
  { id: 9, title: 'Data Structures', description: 'Master the basics of data structures in programming.' },
  { id: 10, title: 'Algorithms', description: 'Learn common algorithms for problem-solving.' },
  { id: 11, title: 'Introduction to DevOps', description: 'Learn about CI/CD, pipelines, and automation.' },
  { id: 12, title: 'Cybersecurity Essentials', description: 'Understand the basics of protecting digital assets.' },
];

const LessonGrid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const suggestions = location.state?.suggestions || [];

  const handleLessonSelect = (id) => {
    navigate(`/lesson-detail/${id}`);
  };

  return (
    <div className="lesson-grid container">
      {suggestions.length > 0 && (
        <div className="suggested-lessons">
          <h2>Recommended Lessons</h2>
          <div className="row">
            {suggestions.map((lesson, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <LessonCard
                  title={lesson}
                  description="A personalized lesson based on your quiz answers."
                  onStartLesson={() => handleLessonSelect(index + 1)} // Adjust ID based on suggestions
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <h2>All Lessons</h2>
      <div className="row">
        {lessons.map((lesson) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={lesson.id}>
            <LessonCard
              title={lesson.title}
              description={lesson.description}
              onStartLesson={() => handleLessonSelect(lesson.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonGrid;
