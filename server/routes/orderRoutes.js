// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// This route is protected!
router.route('/').post(protect, addOrderItems);

module.exports = router;