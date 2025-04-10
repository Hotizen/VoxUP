const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // ✅ Import the User model
require('dotenv').config();

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey123"; // You can keep a default or set one in .env

// ✅ Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("❌ Registration Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Protected Profile Route
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Welcome to your profile!", user });
    } catch (err) {
        console.error("❌ Profile Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Middleware to verify JWT token
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
