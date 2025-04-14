import React, { useEffect, useRef } from 'react';
import './VoiceCommandsPopup.css';

const VoiceCommandsPopup = ({ isOpen, onClose }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && isOpen && onClose();
    window.addEventListener("keydown", handleEsc);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commandSections = [
    {
      title: "Navigation", icon: "🌐", commands: [
        { phrase: "Go to home", description: "Navigate to homepage" },
        { phrase: "Open about", description: "Go to about section" },
        { phrase: "Go to progress", description: "View your progress" },
        { phrase: "Go to leaderboard", description: "Check leaderboard" },
        { phrase: "Go to profile", description: "Open your profile" },
        { phrase: "Go to personal home", description: "Open personalized home" },
        { phrase: "Go to compiler", description: "Open code compiler" },
        { phrase: "Go to challenges", description: "Start coding challenges" },
        { phrase: "Go to quiz / Start quiz", description: "Start the quiz" },
        { phrase: "Explore lessons / Go to lessons", description: "View all lessons" },
        { phrase: "Start Python lesson", description: "Begin Python course" },
        { phrase: "Continue", description: "Continue to next lesson" },
        { phrase: "Go back / Go forward", description: "Browser navigation" }
      ]
    },
    {
      title: "Authentication", icon: "🔐", commands: [
        { phrase: "Login / Sign in", description: "Open login form" },
        { phrase: "Sign up / Register", description: "Switch to signup" },
        { phrase: "Logout", description: "Sign out from account" }
      ]
    },
    {
      title: "Quiz", icon: "🎯", commands: [
        { phrase: "Get started", description: "Start the quiz journey" },
        { phrase: "Submit answer", description: "Submit your answer" },
        { phrase: "Select option 1 / 2 / 3", description: "Choose a quiz option" },
      ]
    },
    {
      title: "Compiler", icon: "💻", commands: [
        { phrase: "Run code", description: "Execute the code" },
        { phrase: "Clear code", description: "Reset editor content" }
      ]
    },
    {
      title: "Voice & Fun", icon: "✨", commands: [
        { phrase: "Show commands", description: "Open this help panel" },
        { phrase: "How many points do I have", description: "Read out your score" },
        { phrase: "Which badge did I earn", description: "Announce your latest badge" },
        { phrase: "Motivate me", description: "Get an encouraging message" }
      ]
    }
  ];

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3 className="popup-title">🎤 Voice Commands</h3>
        </div>
        <div className="scroll-container" ref={scrollRef}>
          {commandSections.map((section, index) => (
            <div key={index} className="command-section">
              <h4 className="section-title">
                <span>{section.icon}</span> {section.title}
              </h4>
              <ul className="command-list">
                {section.commands.map((cmd, idx) => (
                  <li key={idx} className="command-item">
                    <span className="command-phrase">{cmd.phrase}</span>
                    <span className="command-description"> — {cmd.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="popup-footer">
          <button className="close-button" onClick={onClose}>✖ Close</button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandsPopup;
