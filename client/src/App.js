import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import HomeScreen from './HomeScreen'; // HomeScreen includes HeroSection
import PersonalHome from './PersonalHome';
import LessonGrid from './LessonGrid';
import LessonDetail from './LessonDetail';
import Quiz from './Quiz'; // Added quiz component
import About from './About';  // About page component
import Footer from './Footer';

const App = () => {
  return (
    <Router>
      <Routes>       
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/lessons" element={<LessonGrid />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
        <Route path="/personal-home" element={<PersonalHome />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;
