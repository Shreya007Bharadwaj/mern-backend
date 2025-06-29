const express = require("express");
const router = express.Router(); // ✅ This line is required!
const User = require("../models/User");

// POST - Create user
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error: error.message });
  }
});

// GET - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = router;
