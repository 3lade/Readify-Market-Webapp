const express = require('express');
const { addBook_fs, getAllBooks_fs, getBookById_fs, deleteBookById_fs } = require('../controllers/bookController_fs');
const { validateToken } = require('../middleware/auth');

const router = express.Router();

// router.post('/add', validateToken,  addBook_fs);
// router.get('/all', getAllBooks_fs);
// router.get('/:id', getBookById_fs);
// router.delete('/:id', validateToken, deleteBookById_fs);

module.exports = router;