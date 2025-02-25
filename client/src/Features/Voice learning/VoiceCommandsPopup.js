import React, { useEffect, useRef } from "react";
import "./VoiceCommandsPopup.css";

const VoiceCommandsPopup = ({ isOpen, onClose }) => {
  const scrollRef = useRef(null);
  
  // Handle escape key to close popup
  useEffect(() => {
    const handleEscKey = (event) => {
      if (isOpen && event.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscKey);
    
    // Prevent body scrolling when popup is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  // Command data structure for better organization
  const commandSections = [
    {
      id: "navigation",
      title: "Navigation",
      icon: "🔹",
      commands: [
        { phrase: '"Go to home" / "Open home"', description: "Navigate to the home page" },
        { phrase: '"Go to about" / "Open about"', description: "Navigate to the about page" },
        { phrase: '"Go to progress" / "View progress"', description: "Open the progress tracking page" },
        { phrase: '"Go to leaderboard" / "View leaderboard"', description: "Open the leaderboard" },
        { phrase: '"Login" / "Sign in"', description: "Navigate to the login page" },
        { phrase: '"Go back"', description: "Go to the previous page" },
        { phrase: '"Go forward"', description: "Move to the next page" }
      ]
    },
    {
      id: "lessons",
      title: "Lesson Controls",
      icon: "📚",
      commands: [
        { phrase: '"Start lesson" / "Explore lessons"', description: "Open the lessons page" },
        { phrase: '"Next lesson"', description: "Move to the next lesson" },
        { phrase: '"Previous lesson"', description: "Go back to the previous lesson" },
        { phrase: '"Pause lesson"', description: "Pause the lesson video" },
        { phrase: '"Resume lesson"', description: "Resume the lesson video" }
      ]
    },
    {
      id: "coding",
      title: "Coding Controls",
      icon: "💻",
      commands: [
        { phrase: '"Open compiler"', description: "Navigate to the code compiler" },
        { phrase: '"Run code"', description: "Execute the code in the compiler" },
        { phrase: '"Clear code"', description: "Clear the code editor" },
        { phrase: '"Insert template"', description: "Insert a default Python template" }
      ]
    },
    {
      id: "quizzes",
      title: "Quizzes & Challenges",
      icon: "🎯",
      commands: [
        { phrase: '"Take quiz" / "Start quiz"', description: "Start a quiz" },
        { phrase: '"Submit answer"', description: "Submit the current quiz answer" },
        { phrase: '"Show hint"', description: "Display a hint for the quiz question" },
        { phrase: '"Next question"', description: "Move to the next question" },
        { phrase: '"Previous question"', description: "Go back to the previous question" }
      ]
    },
    {
      id: "profile",
      title: "Profile & Progress",
      icon: "👤",
      commands: [
        { phrase: '"Open profile" / "View profile"', description: "Open the profile page" },
        { phrase: '"View achievements"', description: "Show earned achievements" }
      ]
    },
    {
      id: "voice",
      title: "Voice Mode Controls",
      icon: "🎙️",
      commands: [
        { phrase: '"Start voice mode"', description: "Enable voice commands" },
        { phrase: '"Stop listening" / "Disable voice mode"', description: "Turn off voice recognition" }
      ]
    }
  ];

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3 className="popup-title">
            <span>🎤</span> Voice Commands
          </h3>
        </div>
        
        <div className="scroll-container" ref={scrollRef}>
          {commandSections.map((section) => (
            <div key={section.id} className="command-section">
              <h4 className="section-title">
                <span>{section.icon}</span> {section.title}
              </h4>
              
              <ul className="command-list">
                {section.commands.map((command, index) => (
                  <li key={index} className="command-item">
                    <span className="command-phrase">{command.phrase}</span>
                    <span className="command-description">- {command.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="popup-footer">
          <button className="close-button" onClick={onClose}>
            <span>✖</span> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandsPopup;