import 'dotenv/config';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import db from "./config/firebase.js";

import painScoreRoutes from "./routes/painScoreRoutes.js";

import reminderRoutes from "./routes/reminderRoutes.js";
import userRoutes from "./routes/userRoutes.js";




const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get("/test-firebase", async (req, res) => {
  try {
    await db.collection("test").add({
      message: "Firebase working!",
      time: new Date(),
    });

    res.send("Firebase connected successfully 🚀");
  } catch (error) {
    console.error(error);
    res.status(500).send("Firebase error");
  }
});

app.use("/api/pain-score", painScoreRoutes);