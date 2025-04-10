const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const axios = require("axios");
require("dotenv").config();

const app = express();
const authRoutes = require("./auth");
const connectDB = require("./db");
const progressRoutes = require("./progress"); // ✅ Import progress routes

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/progress", progressRoutes); // ✅ Mount progress routes

// ✅ Correct model name from /list-models response
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "models/gemini-1.5-pro-002";  // ✅ Using latest available model

// ✅ Debugging API Key
console.log("🔍 API Key Loaded:", GEMINI_API_KEY ? "✅ Yes" : "❌ No");

// ✅ API for Executing Python Code
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

// ✅ AI-powered voice-to-code conversion
app.post("/generate-code", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Received AI request with prompt:", prompt);
    console.log("🔍 Making request to:", `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: `Convert this into Python code: ${prompt}` }] }],
      }
    );

    console.log("✅ AI Response:", response.data);

    const generatedCode =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "AI could not generate code.";

    res.json({ code: generatedCode });

  } catch (error) {
    console.error("❌ AI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI code generation failed.", details: error.response?.data || error.message });
  }
});

// ✅ AI-powered code autocompletion
app.post("/autocomplete", async (req, res) => {
  const userCode = req.body.code;

  try {
    console.log("🔍 Making request to:", `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`);

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: `Complete this Python code: ${userCode}` }] }],
      }
    );

    const aiSuggestion =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No completion available.";

    res.json({ suggestion: aiSuggestion.trim() });
  } catch (error) {
    console.error("❌ AI Completion Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI completion failed" });
  }
});

// ✅ API to list available models
app.get("/list-models", async (req, res) => {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error listing models:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to list models" });
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("VoxUp Backend is Running...");
});

// ✅ Connect to the database *before* starting the server
connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});