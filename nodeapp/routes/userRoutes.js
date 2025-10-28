const express = require('express');
const {
  addUser,
  getUserByEmailAndPassword,
  getallUsers,
  resetPassword
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', addUser);
router.post('/login', getUserByEmailAndPassword);
router.post('/reset-password', resetPassword);
router.get('/', getallUsers);

module.exports = router;