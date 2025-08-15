import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// testing route
app.get("/", (req, res) => {
    res.send("🚀 Server is up and running!");
});

// Start server
app.listen(PORT, () => {
    console.log(` App is running at http://localhost:${PORT}`);
});