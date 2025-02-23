import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LessonDetail.css';

const lessons = [
  { id: 1, title: 'Intro to Python', description: 'Learn Python programming basics.' },
  
];

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lesson = lessons.find((lesson) => lesson.id === parseInt(id));

  if (!lesson) {
    return <h3>Lesson not Available Right now!!</h3>;
  }

  const handleStartLesson = () => {
    if (lesson.title === 'Intro to Python') {
      navigate('/intro-to-python'); 
    } else {
      alert('This lesson is not yet implemented.');
    }
  };

  return (
    <div className="lesson-detail">
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <button className="btn btn-success" onClick={handleStartLesson}>
        Start Lesson
      </button>
    </div>
  );
};

export default LessonDetail;
