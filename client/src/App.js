import React, { useState } from 'react';
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
import LessonScreen from './LessonScreen';
import IntroToPython from './IntroToPython';
import PythonBasics from './PythonBasics';
import VoiceControl from './VoiceControl';
import ProgressPage from './ProgressPage';
import Leaderboard from './Leaderboard';


const App = () => {
  const [feedback, setFeedback] = useState('');
  return (
    <Router>
      <Routes>       
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/lessons" element={<LessonGrid />} />
        <Route path="/lesson-detail/:id" element={<LessonDetail />} />
        <Route path="/lesson-screen/:lessonTitle" element={<LessonScreen />} />
        <Route path="/personal-home" element={<PersonalHome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/" element={<ThreeColumnSection />} />
        <Route path="/voice-learning" element={<VoiceLearning />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/gamified-learning" element={<GamifiedLearning />} />
        <Route path="/personalized-lessons" element={<PersonalizedLessons />} />
        <Route path="/python-basics" element={<PythonBasics />} />
        <Route path="/intro-to-python" element={<IntroToPython />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<Quiz />} />
        
      </Routes>
      <VoiceControl setFeedback={setFeedback} />
    </Router>
  );
};

export default App;
