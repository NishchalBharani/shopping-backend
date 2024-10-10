// routes/userRoutes.js
import express from 'express';
import { getUserProfile, updateAddress, addAddress } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// User profile routes
router.get('/profile', protect, getUserProfile);
router.put('/address/:id', protect, updateAddress); // Protected route for updating address
router.post('/address/:id', protect, addAddress); // Protected route for adding new address

export default router;
