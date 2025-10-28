const express = require('express');
const { 
  getAllReviews, 
  getReviewById, 
  getReviewsByUserId, 
  getReviewsByBookId, 
  addReview, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviewController');
const { validateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllReviews);
router.get('/user/:userId', getReviewsByUserId);
router.get('/book/:bookId', getReviewsByBookId);
router.get('/:id', getReviewById);
router.post('/', validateToken, addReview);
router.put('/:id', validateToken, updateReview);
router.delete('/:id', validateToken, deleteReview);

module.exports = router;