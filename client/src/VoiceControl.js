import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceControl.css'; // Import CSS

const VoiceControl = ({ setFeedback }) => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(1);
  const [level, setLevel] = useState(0);

  // Initialize Speech Recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function () {
    setFeedback('Voice recognition activated. Please speak.');
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    console.log("You said: ", transcript);
    setFeedback(`You said: ${transcript}`);
    handleVoiceCommand(transcript);
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
  
    if (lowerCommand.includes('start lesson')) {
      setFeedback('Starting lesson...');
      navigate('/lessons');
    } else if (lowerCommand.includes('go to home')) {
      setFeedback('Navigating to Home...');
      navigate('/');
    } else if (lowerCommand.includes('sign in') || lowerCommand.includes('login')) {
      setFeedback('Opening Login page...');
      navigate('/login');
    } else if (lowerCommand.includes('go to about')) {
      setFeedback('Navigating to About page...');
      navigate('/about');
    } else if (lowerCommand.includes('start python basics')|| lowerCommand.includes('continue')) {
      setFeedback('Opening Python basics...');
      navigate('/lessons/python-basics');
    } else if (lowerCommand.includes('go to profile')) {
      setFeedback('Opening profile page...');
      navigate('/profile');
    } else if (lowerCommand.includes('open settings')) {
      setFeedback('Opening settings...');
      navigate('/settings');
    } else if (lowerCommand.includes('show leaderboard')) {
      setFeedback('Opening leaderboard...');
      navigate('/leaderboard');
    } else if (lowerCommand.includes('view badges')) {
      setFeedback('Opening badges section...');
      navigate('/badges');
    } else if (lowerCommand.includes('go to progress')) {
      setFeedback('Opening progress page...');
      navigate('/progress');
    } else if (lowerCommand.includes('next lesson')) {
      setFeedback('Moving to the next lesson...');
      // Logic to navigate to the next lesson
    } else if (lowerCommand.includes('previous lesson')) {
      setFeedback('Returning to the previous lesson...');
      // Logic to navigate to the previous lesson
    } else if (lowerCommand.includes('run code')) {
      setFeedback('Running your code...');
      const code = document.getElementById('compiler-box').value;
  fetch('http://localhost:5000/run-python', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then((response) => response.json())
    .then((data) => setFeedback(`Output: ${data.result}`))
    .catch(() => setFeedback('Error running the code.'));
    } else if (lowerCommand.includes('clear code')) {
      setFeedback('Clearing your code...');
      document.getElementById('compiler-box').value = '';
    } else if (lowerCommand.includes('reset compiler')) {
      setFeedback('Resetting compiler...');
      // Trigger compiler reset logic
    } else if (lowerCommand.includes('log out')) {
      setFeedback('Logging out...');
    } else if (lowerCommand.includes('show my points')) {
      setFeedback('Displaying your points...');
      setFeedback(`You have ${points} points.`);
    } else if (lowerCommand.includes('check streak')) {
      setFeedback('Displaying your streak...');
      setFeedback(`You have a streak of ${streak} days.`);
    } else if (lowerCommand.includes('check my level')) {
      setFeedback('Displaying your level...');
      setFeedback(`You are currently at level ${level}.`);
    } else if (lowerCommand.includes('start quiz') || lowerCommand.includes('find what\'s right for me')) {
      setFeedback('Starting the quiz...');
      navigate('/quiz'); 
    } else {
      setFeedback(`Command "${command}" not recognized.`);
    }
  };
  

  const toggleVoiceControl = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  return (
    <div>
      <button className="voice-control-btn" onClick={toggleVoiceControl}>
        {isListening ? 'Stop Voice Mode' : 'Start Voice Mode'}
      </button>
    </div>
  );
};

export default VoiceControl;
