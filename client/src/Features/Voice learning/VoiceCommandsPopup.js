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
        { phrase: "Go to quiz", description: "Start the quiz" },
        { phrase: "Go back / Go forward", description: "Browser navigation" }
      ]
    },
    {
      title: "Authentication", icon: "🔐", commands: [
        { phrase: "Login / Sign in", description: "Go to login page" },
        { phrase: "Sign up / Register", description: "Go to registration page" },
        { phrase: "Logout", description: "Log out of your account" }
      ]
    },
    {
      title: "Quiz", icon: "🎯", commands: [
        { phrase: "Get started", description: "Begin quiz" },
        { phrase: "Submit answer", description: "Submit your answer" },
        { phrase: "Show hint", description: "Reveal hint for question" },
        { phrase: "Select option 1/2/3", description: "Choose an answer" }
      ]
    },
    {
      title: "Compiler", icon: "💻", commands: [
        { phrase: "Run code", description: "Execute the code" },
        { phrase: "Clear code", description: "Reset code editor" }
      ]
    },
    {
      title: "Extras", icon: "✨", commands: [
        { phrase: "Contact support", description: "Open support page" },
        { phrase: "Show commands", description: "Open this help panel" },
        { phrase: "How many points do I have", description: "Read your current points" },
        { phrase: "Which badge did I earn", description: "Read your recent badge" },
        { phrase: "Motivate me", description: "Get motivation" }
      ]
    }
  ];

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="popup-title">🎤 Voice Commands</h3>
        <div className="scroll-container" ref={scrollRef}>
          {commandSections.map((section, index) => (
            <div key={index} className="command-section">
              <h4><span>{section.icon}</span> {section.title}</h4>
              <ul>
                {section.commands.map((cmd, idx) => (
                  <li key={idx}><strong>{cmd.phrase}</strong> — {cmd.description}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>✖ Close</button>
      </div>
    </div>
  );
};

export default VoiceCommandsPopup;
