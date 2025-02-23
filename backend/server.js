const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process'); 
require('dotenv').config();
const app = express();
const authRoutes = require('./auth');

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);

// API Endpoint for Executing Python Code
app.post('/run-python', (req, res) => {
    console.log('Received POST request at /run-python');
    console.log('Request Body:', req.body);
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
        console.error('Invalid or missing "code" field.');
        return res.status(400).json({ error: 'Invalid or missing "code" field.' });
    }

    console.log('Executing Python code:', code);
    const pythonProcess = spawn('python3', ['-c', code]);

    let output = '';
    let error = ''; // Declare error variable

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
        console.error('Python Error Output:', data.toString());
    });

    pythonProcess.on('close', (exitCode) => { // exitCode is the parameter name
        console.log('Python process closed with code:', exitCode);

        if (exitCode !== 0 || error) { // Use exitCode and the error variable
            console.error('Error during Python execution:', error); // Use the error variable
            return res.status(500).json({ error: error || 'Unknown error occurred' }); // Use the error variable
        }

        console.log('Python Output:', output.trim());
        res.json({ result: output.trim() });
    });
});

// Other API Routes
app.get('/', (req, res) => {
    res.send('VoxUp Backend is Running...');
});

const PORT = process.env.PORT || 5000; // Use environment variable or default
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
