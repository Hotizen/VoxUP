import React from 'react';
import './LessonGrid.css';
import { useParams } from 'react-router-dom';

const lessons = [
    { id: 1, title: 'Intro to JavaScript', description: 'Learn the basics of JavaScript programming.' },
    { id: 2, title: 'Intro to React', description: 'Understand the basics of React and components.' },
];

const LessonDetail = () => {
    const { id } = useParams(); // Extract the lesson ID from the route
    const lesson = lessons.find((lesson) => lesson.id === parseInt(id));

    if (!lesson) {
        return <h3>Lesson not found</h3>;
    }

    return (
        <div className="lesson-detail">
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <button className="btn btn-success">Start Lesson</button>
        </div>
    );
};

export default LessonDetail;


