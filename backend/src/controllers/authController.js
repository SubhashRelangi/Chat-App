import bcrypt from 'bcrypt';
import User from '../models/auth.model.js';

export const signup = async (req, res) => {
  const { username, email, password, profilePic } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: profilePic || '' // fallback if not provided
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};