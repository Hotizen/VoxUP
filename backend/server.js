const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to execute Python code with temporary file (optional)
const runPythonCodeWithTempFile = (code, callback) => {
  const filePath = path.join(__dirname, 'temp_code.py');
  fs.writeFileSync(filePath, code);

  console.log("Received Code:", code);

  exec(`python ${filePath}`, (error, stdout, stderr) => {
    fs.unlinkSync(filePath);

    if (error) {
      console.error("Execution Error:", error);
      callback(`Error: ${error.message}`, null);
      return;
    }

    console.log("Output:", stdout);
    callback(null, stdout);
  });
};

// Function to execute Python code directly (improved version)
const runPythonCodeDirectly = (code, callback) => {
  console.log("Received Code:", code);

  exec(`python3 -c "${code}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("Execution Error:", error);
      callback(`Error: ${error.message}`, null);
      return;
    }

    if (stderr) {
      console.error("Error:", stderr);
      callback(`stderr: ${stderr}`, null);
      return;
    }

    console.log("Output:", stdout);
    callback(null, stdout);
  });
};

// Choose the desired Python code execution method (comment out the unused one)
app.post('/api/execute', (req, res) => {  // Option 1: Using temporary file
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  runPythonCodeWithTempFile(code, (error, output) => {
    if (error) {
      return res.status(400).json({ error });
    }

    res.json({ output });
  });
});

app.post('/run-python', (req, res) => {  
  const pythonCode = req.body.code;

 
  if (!pythonCode || typeof pythonCode !== 'string') {
    return res.status(400).json({ error: 'Invalid Python code input' });
  }

  console.log("Received Code:", pythonCode);

  runPythonCodeDirectly(pythonCode, (error, result) => {
    if (error) {
      return res.status(400).json({ error });
    }

    res.json({ result });
  });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));