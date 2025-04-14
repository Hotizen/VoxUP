import React, { useState, useRef } from "react";
import axios from "axios";
import "./Compiler.css";

const API_BASE_URL = "http://localhost:5000";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const textareaRef = useRef(null);

  const fetchAutocomplete = async (inputCode) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/autocomplete`, { code: inputCode });
      setSuggestion(data.suggestion);
    } catch {
      setSuggestion("");
    }
  };

  const runCode = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/run-python`, { code });
      setOutput(data.result);
    } catch {
      setOutput("An error occurred while running the code");
    }
  };

  const clearCode = () => {
    setCode("");
    setSuggestion("");
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      try {
        const { data } = await axios.post(`${API_BASE_URL}/generate-code`, { prompt: transcript });
        setCode((prev) => prev + (prev ? "\n" : "") + data.code);
      } catch {}
    };

    recognition.onerror = (e) => alert("Speech recognition error: " + e.error);
    recognition.onend = () => setIsListening(false);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    newCode.trim() ? fetchAutocomplete(newCode) : setSuggestion("");
  };

  const acceptSuggestion = (e) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setCode(code + suggestion);
      setSuggestion("");
    }
  };

  return (
    <div className="compiler-container">
      <h2>Python Compiler</h2>
      <div className="code-wrapper">
        <pre className="code-suggestion">{code + suggestion}</pre>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={acceptSuggestion}
          placeholder="Write your Python code here..."
          className="code-textarea"
        />
      </div>

      <div className="button-group">
        <button onClick={startListening} disabled={isListening} className="btn mic">
          🎤 {isListening ? "Listening..." : "Speak Code"}
        </button>
        <button onClick={runCode} className="btn run">▶️ Run Code</button>
        <button onClick={clearCode} className="btn clear">🧹 Clear Code</button>
      </div>

      <div className="output-section">
        <h3>📋 Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
