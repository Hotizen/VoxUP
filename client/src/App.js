import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Navbar/Login/Login';
import HomeScreen from './Components/Homescreen/HomeScreen'; // HomeScreen includes HeroSection
import PersonalHome from './Components/Homescreen/PHome/PersonalHome';
import LessonGrid from './Features/Lessons/LessonGrid';
import LessonDetail from './Features/Lessons/LessonDetail';
import Quiz from './Features/Lessons/Quiz'; // Added quiz component
import About from './Components/Navbar/About/About';
// import Footer from './Components/Footer/Footer';
import ThreeColumnSection from './Components/Threecolumns/ThreeColumnSection'; // Adjusted path
import VoiceLearning from './Components/Threecolumns/VoiceLearning'; // Adjusted path
import GamifiedLearning from './Components/Threecolumns/GamifiedLearning'; // Adjusted path
import PersonalizedLessons from './Components/Threecolumns/PersonalizedLessons'; // Adjusted path
import LessonScreen from './Features/Lessons/LessonScreen';
import IntroToPython from './Features/Lessons/Python/IntroToPython';
import PythonBasics from './Features/Lessons/Python/PythonBasics';
import ProgressPage from './Features/Progress/ProgressPage';
import Leaderboard from './Features/Leaderboard/Leaderboard';
import Navbar from './Components/Navbar/Navbar';
import VoiceControl from './Features/Voice learning/VoiceControl'; // Adjusted path
import Compiler from './Features/Lessons/Python/Compiler';
import Challenges from "./Features/Lessons/Python/Challenges";
import DragAndDropLesson from './Features/Lessons/Python/DragAndDropLesson';  
import CodeComplete from './Features/Lessons/Python/CodeComplete';


const App = () => {
  // // Use state to manage feedback for VoiceControl
  const [feedback, setFeedback] = useState('');

  return (
    <Router>
      <Navbar/>
      <VoiceControl setFeedback={setFeedback} /> 
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/lessons" element={<LessonGrid />} />
        <Route path="/lesson-detail/:id" element={<LessonDetail />} />
        <Route path="/lesson-screen/:lessonTitle" element={<LessonScreen />} />
        <Route path="/personal-home" element={<PersonalHome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/three-column-section" element={<ThreeColumnSection />} />
        <Route path="/voice-learning" element={<VoiceLearning />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/gamified-learning" element={<GamifiedLearning />} />
        <Route path="/personalized-lessons" element={<PersonalizedLessons />} />
        <Route path="/python-basics" element={<PythonBasics />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/drag-and-drop" element={<DragAndDropLesson />} />
        <Route path="/code-complete" element={<CodeComplete />} />
        <Route path="/intro-to-python" element={<IntroToPython />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      {/* <Footer /> Add Footer below Routes */}
      {/* <VoiceControl setFeedback={setFeedback} /> */}
    </Router>
  );
};

export default App;
