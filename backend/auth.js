const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const users = []; // Temporary in-memory storage for users

const SECRET_KEY = "mysecretkey123"; 

// Register Route
router.post('/register', async (req, res) => {  // <-- FIXED!
    const { username, password } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully!" });
});

// Login Route
router.post('/login', async (req, res) => {  // <-- FIXED!
    const { username, password } = req.body;
    
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token });
});

// Protected Route
router.get('/profile', verifyToken, (req, res) => {  // <-- FIXED!
    res.status(200).json({ message: "Welcome to your profile!", user: req.user });
});

// Middleware
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access Denied!" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = router;
