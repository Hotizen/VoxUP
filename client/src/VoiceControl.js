import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceControl.css'; // Import CSS

const VoiceControl = ({ setFeedback }) => {
  const [isListening, setIsListening] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Track the current page
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
    console.log('You said: ', transcript);
    setFeedback(`You said: ${transcript}`);
    handleVoiceCommand(transcript);
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('go to home')) {
      setFeedback('Navigating to Home...');
      navigate('/');
      setCurrentPage('home');
      return;
    }

    if (currentPage === 'home') {
      if (lowerCommand.includes('start lesson') || lowerCommand.includes('explore lessons') || lowerCommand.includes('start listen') || lowerCommand.includes('explore lesson')) {
        setFeedback('Navigating to lessons...');
        navigate('/lessons');
        setCurrentPage('lessons');
      } else if (lowerCommand.includes('go to about')) {
        setFeedback('Navigating to About page...');
        navigate('/about');
        setCurrentPage('about');
      } else if (lowerCommand.includes('go to progress') || lowerCommand.includes('view progress')) {
        setFeedback('Navigating to progress page...');
        navigate('/progress');
        setCurrentPage('progress');
      } else if (lowerCommand.includes('go to leaderboard') || lowerCommand.includes('view leaderboard')) {
        setFeedback('Navigating to Leaderboard page...');
        navigate('/leaderboard');
        setCurrentPage('leaderboard');
      } else if (lowerCommand.includes('take quiz') || lowerCommand.includes('get started') || lowerCommand.includes('find whats right for you')) {
        setFeedback('Navigating to Quiz page...');
        navigate('/quiz');
        setCurrentPage('quiz');
      } else if (lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
        setFeedback('Navigating to Login page...');
        navigate('/login');
        setCurrentPage('login');
      }
    } else if (currentPage == 'progress'){
      if (lowerCommand.includes('go to leaderboard') || lowerCommand.includes('view leaderboard')) {
        setFeedback('Navigating to Leaderboard page...');
        navigate('/leaderboard');
        setCurrentPage('leaderboard');
    }
    } else if (currentPage === 'lessons') {
      if (lowerCommand.includes('start python lesson') || lowerCommand.includes('start listen') || lowerCommand.includes('start lesson')) {
        setFeedback('Starting Python Basics lesson...');
        navigate('/intro-to-python');
        setCurrentPage('intro-to-python');
      }
    } else if (currentPage === 'intro-to-python') {
      if (lowerCommand.includes('start lesson') || lowerCommand.includes('start') || lowerCommand.includes('continue')) {
        setFeedback('Starting Python Basics lesson...');
        navigate('/python-basics');
        setCurrentPage('python-basics');
      }
    } else if (currentPage === 'python-basics') {
      if (lowerCommand.includes('run code')) {
        setFeedback('Running your code...');
        const code = document.getElementById('monaco-editor').getValue();
        fetch('http://localhost:5000/run-python', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })
          .then((response) => response.json())
          .then((data) => setFeedback(`Output: ${data.result}`))
          .catch(() => setFeedback('Error running the code.'));
      }

      // Handle the clear code command for Monaco editor
      else if (lowerCommand.includes('clear code')) {
        setFeedback('Clearing your code...');
        document.getElementById('monaco-editor').setValue(''); // Clear Monaco editor
      }
    } else {
      // Fallback Command
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
