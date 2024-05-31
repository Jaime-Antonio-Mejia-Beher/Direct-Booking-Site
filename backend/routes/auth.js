const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registration endpoint
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Email or password is wrong" });

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid password" });

  // Create and assign a token
  const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
  res.header("auth-token", token).json({ token });
});

module.exports = router;
