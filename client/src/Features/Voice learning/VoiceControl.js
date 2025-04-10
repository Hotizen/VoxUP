import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceCommandsPopup from "../Voice learning/VoiceCommandsPopup";
import './VoiceControl.css';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup state

  useEffect(() => {
    // Cleanup function to stop recognition when component unmounts
    return () => {
      if (recognition && isListening) {
        recognition.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    if (!recognition) return;
    
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
  }, [recognition, isListening]);

  const handleVoiceCommand = (command) => {
    console.log("Recognized Command:", command);

    // ✅ General Navigation Commands
    if (command.includes('go to home') || command.includes('open home')) {
      navigate('/');
      setCurrentPage('home');
    } else if (command.includes('go to about') || command.includes('open about')) {
      navigate('/about');
      setCurrentPage('about');
    } else if (command.includes('go to progress') || command.includes('view progress')) {
      navigate('/progress');
      setCurrentPage('progress');
    } else if (command.includes('go to leaderboard') || command.includes('view leaderboard')) {
      navigate('/leaderboard');
      setCurrentPage('leaderboard');
    } else if (command.includes('login') || command.includes('sign in')) {
      navigate('/login');
      setCurrentPage('login');
    } else if (command.includes('go back')) {
      window.history.back(); // Navigate to the previous page
    } else if (command.includes('go forward')) {
      window.history.forward(); // Navigate to the next page
    }

    // ✅ Lesson Controls
    else if (command.includes('start lesson') || command.includes('explore lessons')) {
      navigate('/lessons');
      setCurrentPage('lessons');
    } else if (command.includes('next lesson')) {
      navigate('/next-lesson'); // Adjust the route accordingly
      setCurrentPage('next-lesson');
    } else if (command.includes('previous lesson')) {
      navigate('/previous-lesson'); // Adjust the route accordingly
      setCurrentPage('previous-lesson');
    } else if (command.includes('pause lesson')) {
      document.getElementById('lesson-video')?.pause();
    } else if (command.includes('resume lesson')) {
      document.getElementById('lesson-video')?.play();
    }

    // ✅ Coding Controls (Compiler)
    else if (command.includes('open compiler')) {
      navigate('/compiler');
      setCurrentPage('compiler');
    } else if (command.includes('run code')) {
      const code = document.getElementById('monaco-editor')?.getValue();
      fetch('http://localhost:5000/run-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      .then((response) => response.json())
      .catch(() => {});
    } else if (command.includes('clear code')) {
      document.getElementById('monaco-editor')?.setValue('');
    } else if (command.includes('insert template')) {
      document.getElementById('monaco-editor')?.setValue('def main():\n    print("Hello, World!")\n\nmain()');
    }

    // ✅ Quiz and Challenges
    else if (command.includes('take quiz') || command.includes('start quiz')) {
      navigate('/quiz');
      setCurrentPage('quiz');
    } else if (command.includes('submit answer')) {
      document.getElementById('quiz-submit')?.click();
    } else if (command.includes('show hint')) {
      const hintElement = document.getElementById('quiz-hint');
      if (hintElement) {
        hintElement.style.display = 'block';
      }
    } else if (command.includes('next question')) {
      navigate('/next-question');
    } else if (command.includes('previous question')) {
      navigate('/previous-question');
    }

    // ✅ Profile and Progress Tracking
    else if (command.includes('open profile') || command.includes('view profile')) {
      navigate('/profile');
      setCurrentPage('profile');
    } else if (command.includes('view achievements')) {
      navigate('/achievements');
      setCurrentPage('achievements');
    }

    // ✅ Login Page Commands
    else if (command.startsWith('enter username')) {
      const username = command.replace('enter username', '').trim();
      const usernameInput = document.getElementById('username');
      if (usernameInput) {
        usernameInput.value = username;
        usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } else if (command.startsWith('enter password')) {
      const password = command.replace('enter password', '').trim();
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.value = password;
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } else if (command.includes('click login')) {
      document.getElementById('login-button')?.click();
    } else if (command.includes('continue as guest')) {
      document.getElementById('guest-button')?.click();
    } else if (command.includes('sign up')) {
      navigate('/signup');
    }

    // ✅ Enhanced Quiz Commands
    else if (command.includes('select option 1')) {
      document.querySelectorAll('.quiz-option-btn')[0]?.click();
    } else if (command.includes('select option 2')) {
      document.querySelectorAll('.quiz-option-btn')[1]?.click();
    } else if (command.includes('select option 3')) {
      document.querySelectorAll('.quiz-option-btn')[2]?.click();
    } else if (command.includes('finish quiz')) {
      navigate('/lessons'); // Redirects after finishing the quiz
    }

    // ✅ Stop Voice Mode
    else if (command.includes('stop listening') || command.includes('disable voice mode')) {
      toggleVoiceControl();
    }
  };

  const toggleVoiceControl = () => {
    if (!recognition) {
      console.error('Speech Recognition not supported in this browser');
      return;
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  // Create a root div for the portal if it doesn't exist
  useEffect(() => {
    let portalRoot = document.getElementById('voice-control-portal');
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = 'voice-control-portal';
      document.body.appendChild(portalRoot);
    }
    
    return () => {
      // Clean up if component unmounts and portal is no longer needed
      if (portalRoot && portalRoot.childNodes.length === 0) {
        document.body.removeChild(portalRoot);
      }
    };
  }, []);

  return (
    <div className="voice-controls-container">
      {/* Popup Button */}
      <button className="info-button" onClick={() => setIsPopupOpen(true)}>📖</button>
      {isPopupOpen && <VoiceCommandsPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}

      <button className="voice-control-btn" onClick={toggleVoiceControl}>
        {isListening ? 'Stop Voice Mode' : 'Start Voice Mode'}
      </button>
    </div>
  );
};

export default VoiceControl;