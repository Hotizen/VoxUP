const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const axios = require("axios");
require("dotenv").config();

const app = express();
const authRoutes = require("./auth");

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// API Endpoint for Executing Python Code
app.post("/run-python", (req, res) => {
  console.log("Received POST request at /run-python");
  console.log("Request Body:", req.body);
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    console.error('Invalid or missing "code" field.');
    return res.status(400).json({ error: 'Invalid or missing "code" field.' });
  }

  console.log("Executing Python code:", code);
  const pythonProcess = spawn("python3", ["-c", code]);

  let output = "";
  let error = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    error += data.toString();
    console.error("Python Error Output:", data.toString());
  });

  pythonProcess.on("close", (exitCode) => {
    console.log("Python process closed with code:", exitCode);

    if (exitCode !== 0 || error) {
      console.error("Error during Python execution:", error);
      return res.status(500).json({ error: error || "Unknown error occurred" });
    }

    console.log("Python Output:", output.trim());
    res.json({ result: output.trim() });
  });
});

// Route for AI-powered voice-to-code conversion
app.post("/generate-code", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          { role: "user", parts: [{ text: `Convert this into Python code: ${prompt}` }] },
        ],
      }
    );

    const generatedCode =
      response.data.candidates[0]?.content?.parts[0]?.text ||
      "AI could not generate code.";
      
    res.json({ code: generatedCode });
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI code generation failed." });
  }
});

// Route for AI-powered code autocompletion
app.post("/autocomplete", async (req, res) => {
    const userCode = req.body.code;
  
    // Call Gemini API for code completion
    try {
      const geminiResponse = await axios.post("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyDnq4nCdC7cTX1Ff08yvaed7M45doRMGZU", {
        contents: [{ role: "user", parts: [{ text: `Complete this Python code: ${userCode}` }] }]
      });
  
      const aiSuggestion = geminiResponse.data.candidates[0].content.parts[0].text || "";
      res.json({ suggestion: aiSuggestion.trim() });
    } catch (error) {
      console.error("Error getting AI completion:", error);
      res.status(500).json({ error: "AI completion failed" });
    }
});
  

// Other API Routes
app.get("/", (req, res) => {
  res.send("VoxUp Backend is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
