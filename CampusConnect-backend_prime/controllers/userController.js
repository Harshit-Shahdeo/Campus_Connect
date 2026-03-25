const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All credentials are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Enter your email and password to login");
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid credentials"); 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            user_id: user.id,
            user_email: user.email,
            user_name: user.username
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
    );

    res.status(200).json({ token });
});

const currentUser = asyncHandler(async (req, res) => {
    
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };