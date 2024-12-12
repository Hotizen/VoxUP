const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// API Endpoint for Executing Python Code
app.post('/run-python', (req, res) => {
  console.log('Received POST request at /run-python'); // Log request initiation
  console.log('Request Body:', req.body); // Log the entire body for debugging
  const { code } = req.body;

  // Validate the received 'code'
  if (!code || typeof code !== 'string') {
    console.error('Invalid or missing "code" field.');
    return res.status(400).json({ error: 'Invalid or missing "code" field.' });
  }
  console.log('Executing Python code:', code);
  const pythonProcess = spawn('python3', ['-c', code]);
  let output = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
    console.error('Python Error Output:', data.toString());
  });

  pythonProcess.on('close', (code) => {
    console.log('Python process closed with code:', exitCode);

    if (exitCode !== 0 || errorOutput) {
      console.error('Error during Python execution:', errorOutput);
      return res.status(500).json({ error: errorOutput || 'Unknown error occurred' });
    }

    console.log('Python Output:', output.trim());
    res.json({ result: output.trim() });
  });
});


app.get('/', (req, res) => {
  res.send('Server is running! Use POST /run-python to execute Python code.');
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
