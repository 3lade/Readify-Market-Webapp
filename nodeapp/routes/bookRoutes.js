const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { validateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateToken, addBook);
router.put('/:id', validateToken, updateBook);
router.delete('/:id', validateToken, deleteBook);

module.exports = router;