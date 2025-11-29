// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Chained Route:
// POST / = Register a user
// GET / = Get all users (Protected & Admin only)
router.route('/').post(registerUser).get(protect, admin, getUsers);

router.post('/login', authUser);

module.exports = router;