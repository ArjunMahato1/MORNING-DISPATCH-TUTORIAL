import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5004;

mongoose
  .connect(process.env.MONGO_URI, { ssl: true })
  .then(() => console.log("Database is connected"))
  .catch((err) => console.error("Database connection error:", err.message));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// GNews API रूट
app.get("/api/news", async (req, res) => {
  const apiKey = process.env.GNEWS_API_KEY || "0b46404119b4b1e3771bc6b4c3e66367";
  const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=6&token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.articles) {
      res.json({ articles: data.articles });
    } else {
      res.status(500).json({ success: false, message: data.errors || "Failed to fetch news" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(() => process.exit(1));
});

process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  server.close(() => process.exit(0));
}); 