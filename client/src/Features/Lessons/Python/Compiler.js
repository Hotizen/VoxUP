import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Compiler.css";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [suggestion, setSuggestion] = useState(""); // AI Code Suggestion
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle
  const textareaRef = useRef(null); // Reference to textarea for autocomplete placement

  // Fetch AI-powered autocomplete suggestions
  const fetchAutocomplete = async (inputCode) => {
    try {
      const response = await axios.post("http://localhost:5000/autocomplete", {
        code: inputCode,
      });
      setSuggestion(response.data.suggestion);
    } catch (error) {
      console.error("AI Autocomplete Error:", error);
      setSuggestion(""); // Clear suggestion on error
    }
  };

  // Run Python Code
  const runCode = async () => {
    try {
      console.log("Sending Code:", code);
      const response = await axios.post("http://localhost:5000/run-python", {
        code,
      });
      setOutput(response.data.result);
      speakOutput(response.data.result); // 🔹 Read output aloud after execution
    } catch (error) {
      console.error("Error:", error);
      setOutput("An error occurred while running the code");
    }
  };

  // Speech-to-Code Function
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("User said:", transcript);

      try {
        // Convert speech to AI-generated code
        const response = await axios.post("http://localhost:5000/generate-code", { prompt: transcript });
        setCode((prev) => prev + (prev ? "\n" : "") + response.data.code);
      } catch (error) {
        console.error("AI Code Generation Error:", error);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      alert("Speech recognition error: " + event.error); // 🔹 Show error alert
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Text-to-Speech Function (Reads Output)
  const speakOutput = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  // Handle Code Input Changes
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);

    if (newCode.trim()) {
      fetchAutocomplete(newCode); // Fetch AI suggestions
    } else {
      setSuggestion(""); // Clear suggestion if input is empty
    }
  };

  // Accept AI Suggestion when "Tab" is Pressed
  const acceptSuggestion = (e) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setCode(code + suggestion);
      setSuggestion("");
    }
  };

  return (
    <div className={`python-compiler-container ${darkMode ? "dark-mode" : ""}`}>
      <h2>Python Compiler</h2>

      <div style={{ position: "relative" }}>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={acceptSuggestion}
          placeholder="Write your Python code here..."
          rows={10}
          cols={50}
          className="code-textarea"
        />
        
        {/* Code Container */}
        <div className="code-container">
          {/* AI Suggestion Overlay (Positioned Under Input) */}
          <pre className="code-suggestion">{code + suggestion}</pre>

          {/* User Input */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={acceptSuggestion}
            placeholder="Write your Python code here..."
            className="code-textarea"
          />
        </div>

      </div>

      <br />
      <div className="compiler-button-container">
        <button className="compiler-button speak-button" onClick={startListening} disabled={isListening}>
          🎤 {isListening ? "Listening..." : "Speak Code"}
        </button>
        <button className="compiler-button run-button" onClick={runCode}>
          ▶️ Run Code
        </button>
      </div>

      <div className="compiler-output">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
