import express from 'express';
import {
  registerUser,
  loginUser,
  createPost,
  listUserPosts,
  listAllPosts,
} from './controller.js';
import { authenticateToken } from './middleware.js';

const router = express.Router();

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Post Routes
router.post('/posts', authenticateToken, createPost);

// Get Routes
router.get('/users/:id/posts', listUserPosts);
router.get('/posts', listAllPosts);

export default router;
