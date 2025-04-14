import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceCommandsPopup from "../Voice learning/VoiceCommandsPopup";
import './VoiceControl.css';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

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
      if (isListening) recognition.start();
    };
  }, [isListening]);

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  };

  const handleVoiceCommand = (command) => {
    console.log("Voice Command:", command);

    // --- Navigation
    if (command.includes("go to home")) navigate("/");
    else if (command.includes("open about")|| command.includes("go to about")) navigate("/about");
    else if (command.includes("go to progress")|| command.includes("show progress")) navigate("/progress");
    else if (command.includes("go to leaderboard")|| command.includes("show leaderboard")) navigate("/leaderboard");
    else if (command.includes("go to profile")) navigate("/profile");
    else if (command.includes("go to personal home")) navigate("/personal-home");
    else if (command.includes("go to compiler")) navigate("/compiler");
    else if (command.includes("go to challenges")) navigate("/challenges");
    else if (command.includes("go to quiz") || command.includes("start quiz")) navigate("/quiz");
    else if (command.includes("go back")) window.history.back();
    else if (command.includes("go forward")) window.history.forward();

    // --- Auth
    else if (command.includes("login")|| command.includes("sign in")) {
      navigate("/login");
      setTimeout(() => {
        // Make sure login form shows
        document.querySelector("#switch-to-login")?.click();
      }, 500);
    }
    else if (command.includes("sign up") || command.includes("register") ) {
      navigate("/login");
      setTimeout(() => {
        // Make sure signup form shows
        document.querySelector("#switch-to-signup")?.click();
      }, 500);
    }
    
    else if (command.includes("logout")) {
      localStorage.clear();
      navigate("/login");
      speak("You have been logged out");
    }

    // --- Quiz
    else if (command.includes("get started") || command.includes("find what's right")) navigate("/quiz");
    else if (command.includes("submit answer")) document.getElementById("quiz-submit")?.click();
    else if (command.includes("select option 1")) document.querySelectorAll(".quiz-option-btn")[0]?.click();
    else if (command.includes("select option 2")) document.querySelectorAll(".quiz-option-btn")[1]?.click();
    else if (command.includes("select option 3")) document.querySelectorAll(".quiz-option-btn")[2]?.click();

    // --- Compiler
    else if (command.includes("run code")) {
      document.getElementById("run-button")?.click();
    } else if (command.includes("clear code")) {
      document.getElementById("clear-button")?.click();
    }
    
    

    // --- Support
    // else if (command.includes("contact support") || command.includes("open contact")) navigate("/contact");

    // --- Voice Popup
    else if (command.includes("show commands")) setIsPopupOpen(true);
    // else if (command.includes("stop listening") || command.includes("disable voice mode")) toggleVoiceControl();

    // --- Fun
    else if (command.includes("motivate me")) speak("You are doing great! Keep going!");
    else if (command.includes("how many points")) speak(`You have ${localStorage.getItem("points") || 0} points`);
    else if (command.includes("which badge")) speak(`Your recent badge is ${localStorage.getItem("badge") || "none"}`);
  };

  const toggleVoiceControl = () => {
    if (!recognition) return console.error("No such Command");
    isListening ? recognition.stop() : recognition.start();
    setIsListening(!isListening);
  };

  return (
    <div className="voice-controls-container">
      <button className="info-button" onClick={() => setIsPopupOpen(true)}>📖</button>
      <button className="voice-control-btn" onClick={toggleVoiceControl}>
        {isListening ? "Stop Voice Mode" : "Start Voice Mode"}
      </button>
      {isPopupOpen && <VoiceCommandsPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default VoiceControl;
