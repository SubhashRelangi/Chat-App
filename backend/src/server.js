import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import authRoutes from './routes/auth.route.js'; 

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

//routes
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    console.log(`App is running at http://localhost:${PORT}`);
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});