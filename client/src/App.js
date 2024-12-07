import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useVoiceRecognition from './useVoiceRecognition';
import './styles.css'; // Import existing styles
import ProgressBar from './ProgressBar';
import Badge from './Badge';
import Leaderboard from './Leaderboard';
import './gamified.css';
import PythonLearning from './PythonLearning';
import LogoAnimation from './LogoAnimation'; // Logo animation screen
import Login from './Login'; // Login screen
import HomeScreen from './HomeScreen'; // Home page after login
import LessonGrid from './LessonGrid'; // Grid of lessons
import LessonDetail from './LessonDetail'; // Individual lesson details

const App = () => {
  const [feedback, setFeedback] = useState('Say a command to begin!');
  const [progress, setProgress] = useState(0); // Progress in percentage
  const [points, setPoints] = useState(0); // Points earned
  const [badges, setBadges] = useState([
    { title: 'First Lesson Completed', earned: false },
    { title: 'Halfway Through', earned: false },
    { title: 'All Lessons Completed', earned: false },
  ]);

  const players = [
    { name: 'Alice', points: 50 },
    { name: 'Bob', points: 30 },
    { name: 'You', points },
  ];

  const speakFeedback = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = (command) => {
    if (command.toLowerCase() === 'start python lesson') {
      setFeedback('Starting Python lesson!');
      speakFeedback('Starting Python lesson!');
      startLesson('Python');
    } else if (command.toLowerCase() === 'show progress') {
      setFeedback(`Your progress is ${progress}%`);
      speakFeedback(`Your progress is ${progress}%`);
    } else if (command.toLowerCase() === 'complete lesson') {
      completeLesson();
      setFeedback('Lesson completed! Progress updated.');
      speakFeedback('Lesson completed! Progress updated.');
    } else {
      setFeedback(`Command "${command}" not recognized.`);
      speakFeedback('Sorry, I did not understand that command.');
    }
  };

  const startLesson = (lessonName) => {
    console.log(`Starting ${lessonName} lesson...`);
    // Additional logic for starting a specific lesson
  };

  const completeLesson = () => {
    setPoints((prev) => prev + 10); // Add points
    setProgress((prev) => {
      const newProgress = prev + 10 > 100 ? 100 : prev + 10;
      updateBadges(newProgress);
      return newProgress;
    });
  };

  const updateBadges = (newProgress) => {
    const updatedBadges = badges.map((badge) => {
      if (badge.title === 'First Lesson Completed' && newProgress >= 10) badge.earned = true;
      if (badge.title === 'Halfway Through' && newProgress >= 50) badge.earned = true;
      if (badge.title === 'All Lessons Completed' && newProgress === 100) badge.earned = true;
      return badge;
    });
    setBadges(updatedBadges);
  };

  const { isListening, transcript, error } = useVoiceRecognition(handleCommand);

  return (
    <Router>
      <Routes>
        {/* Route for logo animation */}
        <Route path="/" element={<LogoAnimation />} />

        {/* Route for login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the home page after login */}
        <Route
          path="/home"
          element={
            <div>
              <div className="container text-center">
                <h1 className="my-4">Welcome to Coding Learning Site</h1>
                <div className="mb-4">
                  <span className="badge bg-success">Beginner</span>
                  <span className="badge bg-warning text-dark ms-2">Intermediate</span>
                </div>
                <button className="btn btn-primary">Get Started</button>
              </div>

              <h1>Learn Coding with Voice Commands</h1>
              <p>{feedback}</p>
              {isListening ? <p>Listening...</p> : <p>Click the button to speak</p>}
              {isListening && <div className="spinner"></div>}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              <div className="progress my-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progress}% Complete
                </div>
              </div>

              <h3>Your Points: {points}</h3>

              <div className="button-group">
                <button className="btn btn-success" onClick={() => startLesson('Python')}>
                  <i className="fas fa-play-circle"></i> Start Python Lesson
                </button>
                <button className="btn btn-info" onClick={() => setFeedback(`Your progress is ${progress}%`)}>
                  <i className="fas fa-chart-bar"></i> Show Progress
                </button>
                <button className="btn btn-warning" onClick={completeLesson}>
                  <i className="fas fa-check-circle"></i> Complete Lesson
                </button>
                <button className="btn btn-danger" onClick={() => window.location.reload()}>
                  <i className="fas fa-redo"></i> Restart Voice Command
                </button>
              </div>

              <p>Last Command: {transcript}</p>

              <h3>Lessons</h3>
              <LessonGrid />

              <h3>Your Badges</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {badges.map((badge, index) => (
                  <Badge key={index} title={badge.title} earned={badge.earned} />
                ))}
              </div>

              <h3>Leaderboard</h3>
              <Leaderboard players={players} />

              <div className="App">
                <h1>Interactive Python Learning</h1>
                <PythonLearning />
              </div>
            </div>
          }
        />

        {/* Route for individual lesson details */}
        <Route path="/lesson/:id" element={<LessonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
