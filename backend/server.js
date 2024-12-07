const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Function to execute Python code
const runPythonCode = (code, callback) => {
    exec(`python3 -c "${code}"`, (error, stdout, stderr) => {
        if (error) {
            callback(`Error: ${error.message}`, null);
            return;
        }
        if (stderr) {
            callback(`stderr: ${stderr}`, null);
            return;
        }
        callback(null, stdout);
    });
};

app.post('/run-python', (req, res) => {
    const pythonCode = req.body.code;

    // Simple input validation
    if (!pythonCode || typeof pythonCode !== 'string') {
        return res.status(400).json({ error: 'Invalid Python code input' });
    }

    runPythonCode(pythonCode, (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        res.json({ result });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
