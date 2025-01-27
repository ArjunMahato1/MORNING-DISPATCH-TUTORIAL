import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';

import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;   // Set port dynamically

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    ssl: true, // Enables SSL connection
  })
  .then(() => console.log('Database is connected'))
  .catch((err) => console.error('Database connection error:', err.message));

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  res.status(statusCode).json({
  success: false,
  statusCode,
  message,
  })
})

// Server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
});

// Error handling (Optional)
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => {
      console.log("Server shut down due to uncaught exception.");
      process.exit(1);  // Exit the process with a failure code
  });
});

process.on('SIGINT', () => {
  console.log("Server is shutting down...");
  server.close(() => {
      console.log("Server shut down successfully.");
      process.exit(0);  // Exit the process cleanly
  });
});

