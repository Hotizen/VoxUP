import React, { useState } from 'react';
import axios from 'axios';

const challenges = [
    {
        id: 1,
        description: "Write a program to calculate the factorial of a number.",
        codeTemplate: "def factorial(n):\n    # Write code here",
        testCase: "factorial(5)",  // Expected output: 120
        solution: "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)"
    },
    {
        id: 2,
        description: "Write a program to check if a number is prime.",
        codeTemplate: "def is_prime(n):\n    # Write code here",
        testCase: "is_prime(11)",  // Expected output: True
        solution: "def is_prime(n):\n    if n <= 1:\n        return False\n    for i in range(2, n):\n        if n % i == 0:\n            return False\n    return True"
    }
];

const PythonLearning = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
    const [progress, setProgress] = useState(0);

    // Function to handle code submission
    const handleSubmit = async () => {
        try {
            // Send the code to the backend to execute
            const response = await axios.post('http://localhost:5000/run-python', { code });
            const output = response.data.result.trim();

            // Compare the output with the expected output based on the challenge's test case
            const expectedOutput = eval(currentChallenge.testCase); // This is safe for simple test cases (e.g., factorial(5))

            if (output === expectedOutput.toString()) {
                setResult("Great! You solved the challenge.");
                setProgress((prevProgress) => Math.min(prevProgress + 50, 100));  // Increment progress
            } else {
                setResult("Try again! Make sure your code works correctly.");
            }
            setError('');
        } catch (err) {
            setError('Error executing Python code');
            setResult('');
        }
    };

    // Handle next challenge logic
    const handleNextChallenge = () => {
        const nextChallenge = challenges.find((challenge) => challenge.id === currentChallenge.id + 1);
        if (nextChallenge) {
            setCurrentChallenge(nextChallenge);
            setProgress(0); // Reset progress for next challenge
            setCode(''); // Clear the code editor
        } else {
            setResult("Congratulations! You've completed all challenges.");
        }
    };

    // Rewards based on progress
    const Rewards = ({ progress }) => {
        if (progress === 100) {
            return <div><strong>Congratulations! You've earned a Python Master badge!</strong></div>;
        } else if (progress >= 50) {
            return <div><strong>Great job! You're halfway to becoming a Python expert!</strong></div>;
        } else {
            return <div>Keep going! You're doing great!</div>;
        }
    };

    return (
        <div className="python-learning">
            <h2>Learn Python: {currentChallenge.description}</h2>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write Python code here..."
                rows="10"
                cols="50"
            />
            <div>
                <button onClick={handleSubmit}>Run Code</button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {result && <div>{result}</div>}
            {progress && <div><strong>Progress:</strong> {progress}%</div>}
            <Rewards progress={progress} />
            <div>
                <button onClick={handleNextChallenge}>Next Challenge</button>
            </div>
        </div>
    );
};

export default PythonLearning;
