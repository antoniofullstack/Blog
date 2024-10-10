import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default to 5000

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', router); // Mount routes at /api endpoint

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
