const express = require('express');
const { login, getMe, updateProfile, changePassword, updateEmailAndPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/update-credentials', protect, updateEmailAndPassword);
router.put('/change-password', protect, changePassword);

module.exports = router;