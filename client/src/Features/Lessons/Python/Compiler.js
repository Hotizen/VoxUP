import React, { useState, useRef } from "react";
import axios from "axios";
import "./Compiler.css";

const API_BASE_URL = "http://localhost:5000"; // ✅ Replace with your backend URL

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const textareaRef = useRef(null);

  // 🧠 AI Autocomplete
  const fetchAutocomplete = async (inputCode) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/autocomplete`, {
        code: inputCode,
      });
      setSuggestion(data.suggestion);
    } catch (error) {
      console.error("AI Autocomplete Error:", error);
      setSuggestion("");
    }
  };

  // ▶️ Run Python code
  const runCode = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/run-python`, { code });
      setOutput(data.result);
      // speakOutput(data.result); // optional
    } catch (error) {
      console.error("Run Code Error:", error);
      setOutput("An error occurred while running the code");
    }
  };

  // 🧹 Clear code
  const clearCode = () => {
    setCode("");
    setSuggestion("");
  };

  // 🎤 Convert speech to code
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      try {
        const { data } = await axios.post(`${API_BASE_URL}/generate-code`, {
          prompt: transcript,
        });
        setCode((prev) => prev + (prev ? "\n" : "") + data.code);
      } catch (error) {
        console.error("AI Code Generation Error:", error);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      alert("Speech recognition error: " + event.error);
    };

    recognition.onend = () => setIsListening(false);
  };

  // 🔊 Speak output (optional)
  const speakOutput = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  // 📝 Handle code changes
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (newCode.trim()) {
      fetchAutocomplete(newCode);
    } else {
      setSuggestion("");
    }
  };

  // 🪄 Accept AI suggestion
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

      <div className="code-container">
        <pre className="code-suggestion">{code + suggestion}</pre>
        <textarea
          id="code-editor"
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={acceptSuggestion}
          placeholder="Write your Python code here..."
          rows={10}
          cols={50}
          className="code-textarea"
        />
      </div>

      <div className="compiler-button-container">
        <button
          className="compiler-button speak-button"
          onClick={startListening}
          disabled={isListening}
        >
          🎤 {isListening ? "Listening..." : "Speak Code"}
        </button>

        <button
          id="run-button"
          className="compiler-button run-button"
          onClick={runCode}
        >
          ▶️ Run Code
        </button>

        <button
          id="clear-button"
          className="compiler-button clear-button"
          onClick={clearCode}
        >
          🧹 Clear Code
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
