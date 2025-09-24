import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'; 
import messageRoutes from './routes/message.route.js';
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import Server from socket.io

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGODB_URL;

// Create HTTP server
const httpServer = http.createServer(app); // Create http server from express app

// Initialize Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173', // Allow frontend origin
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

// routes
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

// Socket.IO connection handling
const onlineUsers = new Map(); // Map to store online users: userId -> socketId

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        onlineUsers.set(userId, socket.id);
    }

    // Emit online users to all connected clients
    io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Remove disconnected user from onlineUsers map
        for (let [key, value] of onlineUsers.entries()) {
            if (value === socket.id) {
                onlineUsers.delete(key);
                break;
            }
        }
        // Emit updated online users to all connected clients
        io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
    });
});

// Pass io instance to message routes (if needed for broadcasting from controllers)
app.use((req, res, next) => {
    req.io = io;
    next();
});


// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Listen with httpServer instead of app
httpServer.listen(PORT, () => {
    console.log(`App and Socket.IO server are running at http://localhost:${PORT}`);
});