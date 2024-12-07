const { exec } = require('child_process');

const runPythonCode = (code, callback) => {
    // Escape potentially unsafe characters
    const sanitizedCode = code.replace(/"/g, '\\"');

    exec(`python3 -c "${sanitizedCode}"`, (error, stdout, stderr) => {
        if (error) {
            callback(null, { error: error.message });
            return;
        }
        if (stderr) {
            callback(null, { error: stderr });
            return;
        }
        callback(null, { result: stdout });
    });
};

module.exports = { runPythonCode };
