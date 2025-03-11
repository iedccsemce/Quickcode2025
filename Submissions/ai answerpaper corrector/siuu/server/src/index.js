import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import paperRoutes from './routes/paperRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(morgan('dev')); // HTTP request logger
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Paper Upload Portal API' });
});

// Paper evaluation routes
app.use('/api/papers', paperRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});