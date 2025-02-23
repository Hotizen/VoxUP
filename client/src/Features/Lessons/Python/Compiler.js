import React, { useState } from "react";
import axios from "axios";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  // Function to run Python code
  const runCode = async () => {
    try {
      console.log("Sending Code:", code);
      const response = await axios.post("http://localhost:5000/run-python", {
        code, // Send the code in the request body
      });
      setOutput(response.data.result); // Update output with response data
      speakOutput(response.data.result); // Read output aloud
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error || "An error occurred while running the code";
      setOutput(errorMessage);
      speakOutput(errorMessage); // Read error aloud
    }
  };

  // Function to handle speech recognition (Voice Input)
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US"; // Set recognition language
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCode((prev) => prev + "\n" + transcript); // Append spoken text to the existing code
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };
  };

  // Function to read the output aloud (Text-to-Speech)
  const speakOutput = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div>
      <h2>Python Compiler</h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
        rows={10}
        cols={50}
      />
      
      <br />
      <button onClick={startListening}>🎤 Speak Code</button>
      <button onClick={runCode}>▶️ Run Code</button>

      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
