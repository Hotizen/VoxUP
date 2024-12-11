import React, { useState } from "react";
import axios from "axios";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      console.log("Sending Code:", code);
      const response = await axios.post("http://localhost:5000/run-python", {
        code, // Send the code in the request body
      });
      setOutput(response.data.result); // Update output with response data
    } catch (error) {
      console.error("Error:", error); // Log the entire error object
      setOutput(
        error.response?.data?.error || "An error occurred while running the code"
      ); // Display user-friendly error message
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
        rows={10}
        cols={50}
      />
      <button onClick={runCode}>Run Code</button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;