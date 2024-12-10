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
import ThreeColumnSection from './ThreeColumnSection'; // Adjusted path
import VoiceLearning from './VoiceLearning'; // Adjusted path
import GamifiedLearning from './GamifiedLearning'; // Adjusted path
import PersonalizedLessons from './PersonalizedLessons'; // Adjusted path


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
        <Route path="/" element={<ThreeColumnSection />} />
        <Route path="/voice-learning" element={<VoiceLearning />} />
        <Route path="/gamified-learning" element={<GamifiedLearning />} />
        <Route path="/personalized-lessons" element={<PersonalizedLessons />} />
      </Routes>
    </Router>
  );
};

export default App;
