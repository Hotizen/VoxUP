import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceControl.css';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    handleVoiceCommand(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // Auto restart when stopped
    }
  };

  const handleVoiceCommand = (command) => {
    if (command.includes('go to home')) {
      navigate('/');
      setCurrentPage('home');
      return;
    }

    if (currentPage === 'home') {
      if (command.includes('start lesson') || command.includes('explore lessons')) {
        navigate('/lessons');
        setCurrentPage('lessons');
      } else if (command.includes('go to about')) {
        navigate('/about');
        setCurrentPage('about');
      } else if (command.includes('go to progress')) {
        navigate('/progress');
        setCurrentPage('progress');
      } else if (command.includes('go to leaderboard')) {
        navigate('/leaderboard');
        setCurrentPage('leaderboard');
      } else if (command.includes('take quiz') || command.includes('get started')) {
        navigate('/quiz');
        setCurrentPage('quiz');
      } else if (command.includes('login') || command.includes('sign in')) {
        navigate('/login');
        setCurrentPage('login');
      }
    } else if (currentPage === 'progress' && command.includes('go to leaderboard')) {
      navigate('/leaderboard');
      setCurrentPage('leaderboard');
    } else if (currentPage === 'lessons' && command.includes('start python lesson')) {
      navigate('/intro-to-python');
      setCurrentPage('intro-to-python');
    } else if (currentPage === 'intro-to-python' && (command.includes('start lesson') || command.includes('continue'))) {
      navigate('/python-basics');
      setCurrentPage('python-basics');
    } else if (currentPage === 'python-basics') {
      if (command.includes('run code')) {
        const code = document.getElementById('monaco-editor').getValue();
        fetch('http://localhost:5000/run-python', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })
          .then((response) => response.json())
          .catch(() => {});
      } else if (command.includes('clear code')) {
        document.getElementById('monaco-editor').setValue('');
      }
    }
  };

  const toggleVoiceControl = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  useEffect(() => {
    return () => {
      recognition.stop();
    };
  }, []);

  return (
    <div>
      <button className="voice-control-btn" onClick={toggleVoiceControl}>
        {isListening ? 'Stop Voice Mode' : 'Start Voice Mode'}
      </button>
    </div>
  );
};

export default VoiceControl;
