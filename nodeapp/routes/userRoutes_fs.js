const express = require('express');
const { register_fs, login_fs, resetPassword_fs, getAllUsers_fs } = require('../controllers/userController_fs');

const router = express.Router();

// router.post('/register', register_fs);
// router.post('/login', login_fs);
// router.post('/reset-password', resetPassword_fs);
// router.get('/all', getAllUsers_fs);

module.exports = router;