const express = require('express');
const { login, getMe, updateProfile, changePassword, updateEmailAndPassword, createUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/update-credentials', protect, updateEmailAndPassword);
router.put('/change-password', protect, changePassword);
router.post('/create-user', protect, createUser);
router.get('/verify', protect, (req, res) => {
  res.status(200).json({ success: true, message: 'Token is valid' });
});


module.exports = router;