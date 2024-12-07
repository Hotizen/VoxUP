import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceControl = ({ setFeedback }) => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  // Initialize Speech Recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Configure continuous listening
  recognition.continuous = true; // Keeps the recognition going until stopped
  recognition.interimResults = true; // Allows for interim results (live speech recognition)

  recognition.onstart = function () {
    setFeedback('Voice recognition activated. Please speak.');
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    console.log("You said: ", transcript);
    setFeedback(`You said: ${transcript}`);
    handleVoiceCommand(transcript);
  };

  // Handle specific voice commands
  const handleVoiceCommand = (command) => {
    if (command.toLowerCase().includes('start lesson')) {
      setFeedback('Starting lesson...');
      navigate('/lessons');
    } else if (command.toLowerCase().includes('go to home')) {
      setFeedback('Navigating to Home...');
      navigate('/home');
    } else if (command.toLowerCase().includes('sign in') || command.toLowerCase().includes('login')) {
      setFeedback('Opening Login page...');
      navigate('/login');
    } else if (command.toLowerCase().includes('go to about')) {
      setFeedback('Navigating to About page...');
      navigate('/about');
    } else {
      setFeedback(`Command "${command}" not recognized.`);
    }
  };

  // Toggle voice control (start/stop listening)
  const toggleVoiceControl = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      recognition.start(); // Start listening
    } else {
      recognition.stop(); // Stop listening
    }
  };

  return (
    <div>
      <button className="btn btn-secondary mt-4" onClick={toggleVoiceControl}>
        {isListening ? 'Stop Voice Mode' : 'Start Voice Mode'}
      </button>
    </div>
  );
};

export default VoiceControl;
